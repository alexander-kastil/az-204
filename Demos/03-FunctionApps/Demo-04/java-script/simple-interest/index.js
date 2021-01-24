module.exports = async function (context, req) {
  // Excute: http://localhost:7071/api/simple-interest?principal=100&rate=10&term=2

  const principal = parseFloat(req.query.principal);
  const rate = parseFloat(req.query.rate);
  const term = parseFloat(req.query.term);

  if ([principal, rate, term].some(isNaN)) {
    context.res = {
      status: 400,
      body: "Please supply principal, rate and term in the query string",
    };
  } else {
    let resp = { body: principal * rate * term };
    console.log("response: ", resp);
    context.res = resp;
  }
};
