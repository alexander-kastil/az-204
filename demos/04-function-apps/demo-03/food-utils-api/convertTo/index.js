const { default: axios } = require('axios');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const currency = (req.query.currency || (req.body && req.body.currency));
    const amount = parseFloat((req.query.amount || (req.body && req.body.amount)));
    const fixerKey = process.env["FixerKey"];
    const qry = `http://data.fixer.io/api/latest?access_key=${fixerKey}&format=1`
    const result = await axios.get(qry)
    const rate = result.data.rates[currency];

    if(rate){
        context.res = {
            body: rate * amount
        };
    }else{
        context.res = {
            status: 400,
            body: "err with params or in function"
        };
    }
}