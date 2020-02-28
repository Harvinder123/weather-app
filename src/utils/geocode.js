const request = require('request');
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidGVzdGluZzIwMTd1c2VycyIsImEiOiJjazZxMm82OWYxc3VpM2VucWQ2eGo3Mzc3In0.0k-OL_P2XaKkanFJcy6Jrg';

const geocode = (address, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token='+MAPBOX_ACCESS_TOKEN+'&limit=1';
    request({url:geocodeUrl,json:true},(error,response) => {
        if(error) {
            callback('Unable to reach weather service!',undefined);
        } else if(response.body.features.length === 0) {
            callback('Unable to find location! Try another Search', undefined);
        } else {
            callback(undefined,{
                latitude:  response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geocode:geocode
}