var express = require('express');
var app = express();
var hotel_route = require('./hotel');

app.get('/', function (req, res) {
  var category = req.params.category;
  var numPeople = req.params.numPeople;
  var budget = req.params.budget;
  var location = req.params.location;
  console.log(location);
});



app.use('/hotel', hotel_route);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
 });

//routing, web service, each will call a function inside e.g. hotel.js


//creates empty JSON
var fs = require('fs');
var emptyObject = {
  packages: []
}
fs.writeFile("./combined.json", JSON.stringify(emptyObject), (err) => {
  if (err) {
      console.error(err);
      return;
  };
  console.log("Empty JSON has been created");
});


fs.readFile('./flights.json', 'utf8', function readFileCallback(err, data){
  if (err){
      console.log(err);
  } else {
      var flightObject = JSON.parse(data); //now it an object
}});

// fs.readFile('./hotel.json', 'utf8', function readFileCallback(err, data){
//   if (err){
//       console.log(err);
//   } else {
//       var hotelObject = JSON.parse(data); //now it an object
// }});

fs.readFile('./food.json', 'utf8', function readFileCallback(err, data){
  if (err){
      console.log(err);
  } else {
      var foodObject = JSON.parse(data); //now it an object
}});

var combinedObject = [];
for (var i=0; i<7; i++) {
  var package = {
    totalCost: parseInt(flightObject.flights[i].cost, 10) + numPeople * parseInt(foodObject.food[i].avgPrice, 10),
    flight: flightObject.flights[i],
    //hotel: hotelObject.hotels[i],
    food:foodObject.food[i]
  };
  if (package.totalCost < budget){
    combinedObject.push(package);
  }
}

fs.writeFile("./combined.json", JSON.stringify(combinedObject, null, 4), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("Combined JSON has been modified");
});