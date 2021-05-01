const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
  const outputs = [];

  outputs.push(yield context.df.callActivity("Approval", "Approved"));
  outputs.push(yield context.df.callActivity("Approval", "Rejected"));

  return outputs;
});
