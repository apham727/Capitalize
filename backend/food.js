
'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = '4mDizWWU3VWbTEPt_wlGaCvYkzQkvDhBrGiSTxKIXyyNnyOMiLqeyDBSZ357CcFsGuolnl34sF4Byjy64KFwtFHkvUcrw7suHDXFeIN6_iBmO4q4FHV1Bw_m7ltMXXYx';

const searchRequest = {
  term:'Four Barrel Coffee',
  location: loc
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});


