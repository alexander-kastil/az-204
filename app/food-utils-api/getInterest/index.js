module.exports = async function (context, req) {
    const principal = parseFloat(req.body.principal);
    const rate = parseFloat(req.body.rate);

    if ([principal, rate].some(isNaN)) {
        context.res = {
            status: 400,
            body: "Please supply principal, rate and term in the query string",
        };
    } else {
        let resp = { body: principal * rate / 100};
        console.log("response: ", resp);
        context.res = resp;
    }
}