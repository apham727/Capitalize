var Request = require("request");

Request.get("http://www.googleapis.com/travelpartner/v2.0/AIzaSyA8mG_bSeuX3i5KhmnkBzX7zKMWamCA3Rs", (error, response, body) => {
    if (error) {
        return console.dir(error);
    }
    console.dir(JSON.parse(body));
});


