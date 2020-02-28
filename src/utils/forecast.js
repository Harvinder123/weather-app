const request = require('request');
const DARKSKY_API_KEY = '0150b9c028b52b9a474d1fcaed06be55';

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/'+DARKSKY_API_KEY+'/'+latitude+','+longitude;
    request({url, json:true},(error,response) => {
        if(error) {
            callback('Unable to get weather service!', undefined);
        } else if(response.body.error) {
            callback('Unable to find location! Try another Search', undefined);
        } else {
            callback(undefined, response.body.daily.data[0].summary+' It is currently '+response.body.currently.temperature+' degrees out. There is a '+response.body.currently.precipProbability+' % chances of rain.')
        }
    })
}
module.exports = {
    forecast:forecast
}