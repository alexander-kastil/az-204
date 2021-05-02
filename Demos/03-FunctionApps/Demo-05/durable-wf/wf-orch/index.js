const df = require("durable-functions");
const moment = require("moment");

module.exports = df.orchestrator(function* (context) {
  const outputs = [];

  outputs.push(yield context.df.callActivity("Approval", "Approved"));
  outputs.push(yield context.df.callActivity("Approval", "Rejected"));

  // const deadline = moment.utc(context.df.currentUtcDateTime).add(20, "s");
  // const activityTask = context.df.waitForExternalEvent("Approval");
  // const timeoutTask = context.df.createTimer(deadline.toDate());

  // const winner = yield context.df.Task.any([activityTask, timeoutTask]);
  // if (winner === activityTask) {
  //   outputs.push(yield context.df.callActivity("Approval", "Approved"));
  // } else {
  //   outputs.push(yield context.df.callActivity("Escalation", "Head of department"));
  // }

  // if (!timeoutTask.isCompleted) {
  //   // All pending timers must be complete or canceled before the function exits.
  //   timeoutTask.cancel();
  // }

  return outputs;
});
