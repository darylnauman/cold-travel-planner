const createExchange = require('live-currency-exchange');

const exchange = createExchange();


const exchangeCurrency = async (source, target) => {
    const response = await exchange.convert({source: source, target: target});
    console.log(response)
    return response.rate;
}


module.exports = exchangeCurrency;