var express = require('express');
var app = express();
var hotel_route = require('./hotel');

var category 
var numPeople 
var budget 
var location
var aggregate 

var cors = require('cors')
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "localhost22222"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

app.get('/', function (req, res) {
  
  category = req.params.category;
  numPeople = req.params.numPeople;
  budget = req.params.budget;
  location = req.params.location;
  console.log(location);

  
  // Website you wish to allow to connect
res.header('Access-Control-Allow-Origin', '*');

// Request methods you wish to allow
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, X-Requested-With', 'X-HTTP-Method-Override');
res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

  res.send(aggregate)
});



app.use('/hotel', hotel_route);
// var sql = require("./food");
// sql.a();
// var sql = require("./flights");
// sql.a();

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


// fs.readFileAsync('./flights.json', 'utf8', function readFileAsyncCallback(err, data){
//   if (err){
//       console.log(err);
//   } else {
//       var flightObject = JSON.parse(data); //now it an object
//       for (var i=0; i<flightObject.flights.length; i++){
//         var packageObject = {
//           destination: flightObject.flights[i].departingFlight.arrivalLoc,
//           totalCost: parseInt(flightObject.flights[i].cost, 10),
//           flight: flightObject.flights[i],
//           hotel: "hotel",
//           food: "food"
//         };
//         fs.readFileAsync('./combined.json', 'utf8', function readFileAsyncCallback(err, data){
//           if (err){
//               console.log(err);
//           } else {
//               var modified_obj = JSON.parse(data); //now it an object
//               modified_obj.packages.push(packageObject); //add some data
//               fs.writeFileAsync("./combined.json", JSON.stringify(modified_obj, null, 4), (err) => {
//                   if (err) {
//                       console.error(err);
//                       return;
//                   };
//                   console.log("Combined JSON has been modified");
//               });
//           }});
//       }
//   }  
// });



// fs.readFileAsync('./hotel.json', 'utf8', function readFileAsyncCallback(err, data){
//   if (err){
//       console.log(err);
//   } else {
//       var hotelObject = JSON.parse(data); //now it an object
//       for (var i=0; i<hotelObject.hotels.length; i++){
//         var packageObject = hotelObject.hotels[i];
//         fs.readFileAsync('./combined.json', 'utf8', function readFileAsyncCallback(err, data){
//           if (err){
//               console.log(err);
//           } else {
//               var mod_hotel_obj = JSON.parse(data); //now it an object
//               console.log(mod_hotel_obj.packages)
//               mod_hotel_obj.packages[i]["hotel"] = packageObject; //add some data
//               fs.writeFileAsync("./combined.json", JSON.stringify(mod_hotel_obj, null, 4), (err) => {
//                   if (err) {
//                       console.error(err);
//                       return;
//                   };
//                   console.log("Combined JSON has been modified");
//               });
//           }});
//       }
//   }  
// });
/*
fs.readFileAsync('./food.json', 'utf8', function readFileAsyncCallback(err, data){
  if (err){
      console.log(err);
  } else {
      var foodObject = JSON.parse(data); //now it an object
      for (var i=0; i<foodObject.food.length; i++){
        var packageObject = foodObject.food[i];
        fs.readFileAsync('./combined.json', 'utf8', function readFileAsyncCallback(err, data){
          if (err){
              console.log(err);
          } else {
              var modified_obj = JSON.parse(data); //now it an object
              modified_obj.packages[i]["food"] = packageObject; //add some data
              fs.writeFileAsync("./combined.json", JSON.stringify(modified_obj, null, 4), (err) => {
                  if (err) {
                      console.error(err);
                      return;
                  };
                  console.log("Combined JSON has been modified");
              });
          }});
      }
  }  
});
*/

var flightObject;
var hotelObject;
var foodObject;


  // fs.readFileAsync('./flights.json', 'utf8', function readFileAsyncCallback(err, data){
  //   if (err){
  //       console.log(err);
  //   } else {
  //       flightObject = JSON.parse(data); //now it an object
  //   }  
  // });



  // fs.readFileAsync('./hotel.json', 'utf8', function readFileAsyncCallback(err, data){
  //   if (err){
  //       console.log(err);
  //   } else {
  //       hotelObject = JSON.parse(data); //now it an object
  //   }  
  // });



  fs.readFile('./food.json', 'utf8', (err, data) => {
    if (err){
        console.log(err);
    } else {
        foodObject = JSON.parse(data); //now it an object
        fs.readFile('./hotel.json', 'utf8', (err, data) => {
          if (err){
              console.log(err);
          } else {
              hotelObject = JSON.parse(data); //now it an object
              fs.readFile('./flights.json', 'utf8', (err, data) => {
                if (err){
                    console.log(err);
                } else {
                    flightObject = JSON.parse(data); //now it an object
                    

                    console.log(flightObject["flights"].length)
                    var returnObj = []
                    for (let i=0; i < flightObject["flights"].length; i++) {
                      returnObj.push(
                        {
                          "flights": flightObject["flights"][i], 
                          "hotels": hotelObject["hotels"][i], 
                          "food": foodObject["food"][i],
                          "departureDate": "2019-11-27",
                          "returnDate": "2019-12-01",
                          "destination": hotelObject["hotels"][i]["city"],
                          "totalCost": (parseInt(flightObject["flights"][i]["cost"],10)) * 0.83
                        }
                      )
                    }

                    console.log(returnObj)
                    fs.writeFile("./combined.json", JSON.stringify(returnObj, null, 4), (err) => {
                          if (err) {
                              console.error(err);
                              return;
                          };
                          console.log("Combined JSON has been modified");
                      });
                      aggregate = JSON.stringify(returnObj)
                    
                   
                    
                    
                }  
              });
          }  
        });
        // AGGREGATION LOGIC 
        console.log(flightObject)
    }  
  });








/*
fs.readFileAsync('./food.json', 'utf8', function readFileAsyncCallback(err, data){
  if (err){
      console.log(err);
  } else {
      var foodObject = JSON.parse(data); //now it an object
}});

var combinedObject = [];
for (var i=0; i<7; i++) {
  var package = {
    totalCost: parseInt(flightObject.flights[i].cost, 10) + numPeople * parseInt(foodObject.food[i].avgPrice, 10) + numPeople * parseInt(hotelObject.hotel[i].price, 10),
    flight: flightObject.flights[i],
    hotel: hotelObject.hotels[i],
    food:foodObject.food[i]
  };
  if (package.totalCost < budget){
    combinedObject.push(package);
  }
}

fs.writeFileAsync("./combined.json", JSON.stringify(combinedObject, null, 4), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("Combined JSON has been modified");
});*/