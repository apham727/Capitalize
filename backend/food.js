
'use strict';

const yelp = require('yelp-fusion');

var destinations_by_category = require('./destinations.json');
var fs = require("fs");
var category = "beach";
var num_people = 4;

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = '4mDizWWU3VWbTEPt_wlGaCvYkzQkvDhBrGiSTxKIXyyNnyOMiLqeyDBSZ357CcFsGuolnl34sF4Byjy64KFwtFHkvUcrw7suHDXFeIN6_iBmO4q4FHV1Bw_m7ltMXXYx'; 



//returns json for each destination in category with a couple food suggestions and avg price
//in that location

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


//return json results given category

async function getListOfRestaurants(category){
  var i;
  var destinations = destinations_by_category[category];
  var emptyObject = {
    food: []
  };

  fs.writeFile("./food.json", JSON.stringify(emptyObject), (err) => {
      if (err) {
          console.error(err);
          return;
      };
      console.log("Empty JSON has been created");
  });
  for (i = 0; i < destinations.length; i++) { 
    var city = destinations[i]["city"];
  
    const searchRequest = {
      term:'restaurants',
      location: city
    };
    
    const client = yelp.client(apiKey);
    
    client.search(searchRequest).then(response => {
      
      const results = response.jsonBody.businesses;
      var j;
      var avgPrice;
      var bestRes;
      var secondRes;

      for (j = 0; j < 10; j++) {
        var priceAndRestaurants = calcAvgPrice(results);
        avgPrice = priceAndRestaurants [0];
        bestRes = priceAndRestaurants [1];
        secondRes = priceAndRestaurants [2];
        var addedJSON = addJSON(results, avgPrice, bestRes, secondRes);
        var prettyJson = JSON.stringify(results[j], null, 4);
        //console.log(prettyJson);
        
      }
      
    }).catch(e => {
      console.log(e);
    });
    
    await sleep(1000);
    
  }
}

function addJSON(results, avgPrice, bestRes, secondRes) {
  var bestResName = results[bestRes]["name"];
  var bestResImageURL = results[bestRes]["image_url"];
  var bestResYelpLink = results[bestRes]["url"];
  var secondResName = results[secondRes]["name"];
  var secondResImageURL = results[secondRes]["image_url"];
  var secondResYelpLink = results[secondRes]["url"];

  var food = {
      avgPrice: avgPrice,
      restaurants: [
        {
          name: bestResName,
          image_url: bestResImageURL,
          url: bestResYelpLink
        },
        {
          name: secondResName,
          image_url: secondResImageURL,
          url: secondResYelpLink
        },
      ]
  };
  fs.readFile('./food.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
        var modified_obj = JSON.parse(data); //now it an object
        modified_obj.food.push(food); //add some data
        fs.writeFile("./food.json", JSON.stringify(modified_obj, null, 4), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("Food JSON has been modified");
        });
    }});

}

function calcAvgPrice(results){
  const priceHash = {1:10, 2:20, 3:45, 4:80}
  var i;
  var avg_rating = 0;
  var numItems = 0;
  var maxRating = 0;
  var secondRating = 0;
  var maxRes;
  var secondRes;
  for (i = 0; i < results.length; i++) {
    if(results[i]["price"] != undefined){
      numItems++;
      avg_rating += results[i]["price"].length;
    }
    var rating = parseInt(results[i]["rating"], 10);
    if(rating > secondRating) {
       if(rating > maxRating) {
         secondRating = maxRating;
         secondRes = maxRes;
         maxRating = rating;
         maxRes = i;
       }
       else {
         secondRating = rating;
         secondRes = i;
       }
    }
    
  }
  
  avg_rating = avg_rating/numItems;
  avg_rating = Math.round(avg_rating);
  var n = [priceHash[avg_rating], maxRes, secondRes];
  return n;
}

//number of dollar signs, avg price, name, image url, yelp link

getListOfRestaurants(category);











