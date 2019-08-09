var Amadeus = require('amadeus');
var destinations_by_category = require('./destinations.json');
var fs = require('fs');

var amadeus = new Amadeus({
    clientId: 'YtGy3yfEEA51jNzZhJrNDxpKLslPDl35',
    clientSecret: 'rjoEAtH8jRA271yN'
});

var category = 'beach';
var origin = 'NYC';
var departureDate = '2019-09-02';
var returnDate = '2019-09-09';
var adults = 1;

var destinationArray = destinations_by_category.categories[0][category];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
   }


async function getFlightData() {
    var emptyObject = {
        flights: []
    };
    
    fs.writeFile("./flights.json", JSON.stringify(emptyObject), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("Empty JSON has been created");
    });
    for (var i=0; i<destinationArray.length; i++) {
        await sleep(1000);
        amadeus.shopping.flightOffers.get({
            origin: origin,
            destination: destinationArray[i].iata,
            departureDate: departureDate,
            returnDate: returnDate,
            adults: adults,
            nonStop: false
        }).then(function(response){
            var flightData = response.data[0].offerItems[0];
            var totalCost = flightData.price.total + flightData.price.totalTaxes;

            //To Flight
            var to_numConnections = flightData.services[0].segments.length - 1;
            var to_departureItinerary = flightData.services[0].segments[0].flightSegment;
            var to_arrivalItinerary = flightData.services[0].segments[to_numConnections].flightSegment;
            
            var to_departureLoc = to_departureItinerary.departure.iataCode; //TODO refer to dictionary array in JSON
            var to_arrivalLoc = to_arrivalItinerary.arrival.iataCode;
            var to_departureFlightId = to_departureItinerary.carrierCode + ' ' + to_departureItinerary.number;
            var to_arrivalFlightId = to_arrivalItinerary.carrierCode + ' ' + to_arrivalItinerary.number;
            var to_departureTime = timeConvert(to_departureItinerary.departure.at);
            var to_arrivalTime = timeConvert(to_arrivalItinerary.arrival.at);
            var to_departureDate = dateConvert(to_departureItinerary.departure.at.split('T')[0]);
            var to_arrivalDate = dateConvert(to_arrivalItinerary.arrival.at.split('T')[0]);
            // console.log(to_departureDate);
            // console.log(to_arrivalLoc);

            //Return Flight
            var ret_numConnections = flightData.services[1].segments.length - 1;
            var ret_departureItinerary = flightData.services[1].segments[0].flightSegment;
            var ret_arrivalItinerary = flightData.services[1].segments[ret_numConnections].flightSegment;

            var ret_departureLoc = ret_departureItinerary.departure.iataCode; //TODO refer to dictionary array in JSON
            var ret_arrivalLoc = ret_arrivalItinerary.arrival.iataCode;
            var ret_departureFlightId = ret_departureItinerary.carrierCode + ' ' + ret_departureItinerary.number;
            var ret_arrivalFlightId = ret_arrivalItinerary.carrierCode + ' ' + ret_arrivalItinerary.number;
            var ret_departureTime = timeConvert(ret_departureItinerary.departure.at);
            var ret_arrivalTime = timeConvert(ret_arrivalItinerary.arrival.at);
            var ret_departureDate = dateConvert(ret_departureItinerary.departure.at.split('T')[0]);
            var ret_arrivalDate = dateConvert(ret_arrivalItinerary.arrival.at.split('T')[0]);
            // console.log(ret_departureDate);
            // console.log(ret_arrivalLoc);

            //Write to JSON
            var flightObject = {
                cost: totalCost,
                departingFlight: {
                    numConnections: to_numConnections,
                    departureLoc: to_departureLoc,
                    departureFlightId: to_departureFlightId,
                    departureDate: to_departureDate,
                    departureTime: to_departureTime,
                    arrivalLoc: to_arrivalLoc,
                    arrivalFlightId: to_arrivalFlightId,
                    arrivalDate: to_arrivalDate,
                    arrivalTime: to_arrivalTime
                },
                returnFlight: {
                    numConnections: ret_numConnections,
                    departureLoc: ret_departureLoc,
                    departureFlightId: ret_departureFlightId,
                    departureDate: ret_departureDate,
                    departureTime: ret_departureTime,
                    arrivalLoc: ret_arrivalLoc,
                    arrivalFlightId: ret_arrivalFlightId,
                    arrivalDate: ret_arrivalDate,
                    arrivalTime: ret_arrivalTime
                }
            }

            fs.readFile('./flights.json', 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                    modified_obj = JSON.parse(data); //now it an object
                    modified_obj.flights.push(flightObject); //add some data
                    fs.writeFile("./flights.json", JSON.stringify(modified_obj, null, 4), (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        };
                        console.log("Flight JSON has been modified");
                    });
                }});
            /*fs.writeFile("./flights.json", JSON.stringify(flightObject, null, 4), (err) => {
                if (err) {
                    console.error(err);
                    return;
                };
                console.log("JSON has been created");
            });*/

        }).catch(function(responseError){
            console.log(responseError);
        });
    }
}


function dateConvert (date) {
    var newDate = new Date(date);
    return ((newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' +  newDate.getFullYear())
}
function timeConvert (time) {
    var newTime = new Date(time)
    .toLocaleTimeString({},
      {hour12:true,hour:'numeric',minute:'numeric'}
    );
    return (newTime);
}
  
getFlightData();