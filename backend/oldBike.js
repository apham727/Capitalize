// app.get('/hotel', function (req, res) {
  var Amadeus = require('amadeus');

  var amadeus = new Amadeus({
    clientId: 'raG4uTAYVYFxXBouaXcyxtdl1mZDJoSX',
    clientSecret: 'waiHj6LNZAMmBcfY'
  });

  amadeus.shopping.hotelOffers.get({
    cityCode: 'ffffffffffff'
  }).then(function (response) {
    
    console.log(response)

    const locationType = "beach";///////////////////////////////////////////////////////////////////////


    var destinations = destinations_by_category[locationType];
    res.send(destinations_by_category[locationType]);
  // for ( let j = 0; j < destinations.length; j++) { 
  //   var iata = destinations[j]["iata"];
  //   console.log(iata);

    let rank = Number.MAX_VALUE * -1;
    let hotel = {
      name: '',
      price: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      phone: ''
    }
    for (var i = 0; i < response.data.length; i++) {

      let temp = response.data[i].hotel.rating * 15 - response.data[i].offers[0].price.total * 1.5;
      if (rank < temp) {
        rank = temp;

        let name = response.data[i].hotel.name;
        let address = response.data[i].hotel.address.lines[0]; 
        let postalCode =  response.data[i].hotel.address.postalCode;
        let city = response.data[i].hotel.address.cityName;
        let state = response.data[i].hotel.address.stateCode;
        let price = response.data[i].offers[0].price.total;
        let phone = response.data[i].hotel.contact.phone;

        
        hotel.name = name;
        hotel.price = price;
        hotel.address = address;
        hotel.postalCode = postalCode;
        hotel.city = city;
        hotel.state = state;
        hotel.phone = phone;
        // console.log('Rating: ' + rating + ' Price: ' + price + ' Ranking: ' + rank);
      }
    }

    fs.writeFileSync('hotel.json', JSON.stringify(hotel));
    res.send(hotel)

  // }
  }).catch(function (responseError) {
    console.log(responseError.code);
  });
