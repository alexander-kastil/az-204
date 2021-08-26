const df = require("durable-functions");
const moment = require("moment");

module.exports = df.orchestrator(function* (context) {
  const outputs = [];

  const food = context.df.getInput();
  
  const deadline = moment.utc(context.df.currentUtcDateTime).add(60, "s");
  context.log(`food orchestration for instance: '${context.df.instanceId}' and deadline ${deadline}.`);
  
  const activityTask = context.df.waitForExternalEvent("Approval");
  const timeoutTask = context.df.createTimer(deadline.toDate());

  const winner = yield context.df.Task.any([activityTask, timeoutTask]);
  if (winner === activityTask) {
    context.df.setCustomStatus("Approved")
    outputs.push(yield context.df.callActivity("wfApproval", "Approved"));
    context.log(`food orchestration for instance: '${context.df.instanceId}' is approved. Food: ${food}`);
  } else {
    context.df.setCustomStatus("Escalated")
    outputs.push(yield context.df.callActivity("wfEscalation", "Head of department"));
    context.log(`food orchestration for instance: '${context.df.instanceId}' is escalated.`);
  }

  if (!timeoutTask.isCompleted) {
    // All pending timers must be complete or canceled before the function exits.
    timeoutTask.cancel();
  }

  return outputs;
});
