
var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/hotel', function (req, res) {
  res.send('hotel')
  // const data = https.get('//www.googleapis.com/travelpartner/v2.0/AIzaSyA8mG_bSeuX3i5KhmnkBzX7zKMWamCA3Rs');
  // console.log(data);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//routing, web service, each will call a function inside e.g. hotel.js