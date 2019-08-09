var express = require('express');
var app = express();


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/hotel', function (req, res) {
  // app.router.get('/', (req, res) => {

    var request = require("request");

    var options = {
      method: 'GET',
      url: 'https://test.api.amadeus.com/v2/shopping/hotel-offers',
      qs:
      {
        cityCode: 'PAR',
        adults: '1',
        radius: '10',
        radiusUnit: 'KM',
        paymentPolicy: 'NONE',
        includeClosed: 'false',
        bestRateOnly: 'true',
        view: 'FULL',
        sort: 'PRICE'
      },
      headers:
      {
        'cache-control': 'no-cache',
        // Connection: 'keep-alive',
        // 'Accept-Encoding': 'gzip, deflate',
        Host: 'test.api.amadeus.com',
        'Postman-Token': '9db779f9-e7b9-4620-b8ff-bd6278449c7a,6a8ee9e9-6c42-4a23-8eab-47b99367962c',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        'User-Agent': 'PostmanRuntime/7.15.2',
        Authorization: 'Bearer mssEZvzxx9bFQQ3U6D34cmtg3g2b'
      }
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      // console.log(body.length);
      return res.send(JSON.body);
    });


    // return res.send(body);
  // });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//routing, web service, each will call a function inside e.g. hotel.js