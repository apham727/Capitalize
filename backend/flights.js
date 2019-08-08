var Amadeus = require('amadeus');

var amadeus = new Amadeus({
    clientId: 'YtGy3yfEEA51jNzZhJrNDxpKLslPDl35',
    clientSecret: 'rjoEAtH8jRA271yN'
});
amadeus.shopping.flightOffers.get({
    origin : 'NYC',
    destination : 'MAD',
    departureDate : '2019-08-11'
}).then(function(response){
    console.log(response.data[0].offerItems[0].services[0]);
}).catch(function(responseError){
    console.log(responseError.code);
});


  