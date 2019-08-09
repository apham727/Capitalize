var express = require('express');
var router = express.Router()
var Amadeus = require('amadeus');
var destinations_by_category = require('./destinations.json');
const category = "beach";
const fs = require('fs');

var amadeus = new Amadeus({
    clientId: 'raG4uTAYVYFxXBouaXcyxtdl1mZDJoSX',
    clientSecret: 'waiHj6LNZAMmBcfY'
});

let json_string = [];

function timeout(){
    return new Promise(resolve => setTimeout(resolve,1300));
}

router.get('/', async function (req, res) {
    var destinations = destinations_by_category[category];
    var promise_arr= [];

    for (let i = 0; i < destinations.length; i++) {
        let iata = destinations[i]["iata"];
        let toAdd_promise = fetchHotel(iata);
        promise_arr.push(toAdd_promise);
        await timeout();
    }
    let string_arr = await Promise.all(promise_arr);

    let json_string = '{\"hotels\": [' + string_arr.join(',') + ']}';

    res.send(json_string);
    fs.writeFileSync('hotel.json', json_string);
    console.log("test");

})

function fetchHotel(iata) {

    return new Promise(function (resolve, reject) {
        amadeus.shopping.hotelOffers.get({
            cityCode: iata
        }).then(function (response) {

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
                    let postalCode = response.data[i].hotel.address.postalCode;
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

            resolve(JSON.stringify(hotel))

        }).catch(function (responseError) {
            console.log(responseError);
        });
    })

}

module.exports = router