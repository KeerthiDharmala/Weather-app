const yargs = require('yargs');
const axios = require('axios');
const argv = yargs
.options({
  a: {
  //  demand : false,
    alias : 'address',
    describe : 'Address to fetch a weather',
    string : true
  }
})
.help()
.alias('help','h')
.argv;
if (argv.address === undefined){
  axios.get(`http://ip-api.com/json/`).then((response)=>
{
var lat=  response.data.lat;
var lng=  response.data.lon;
//weatherPred(lat,lng);
var weatherUrl = `https://api.darksky.net/forecast/fd372842dd1c995234e7284bfdd41db2/${lat},${lng}`;
console.log(response.data.city);
return axios.get(weatherUrl);
}).then((response)=>{
var temperature = response.data.currently.temperature;
var apparentTemperature = response.data.currently.apparentTemperature;
var dailytempmin = response.data.daily.data[0].temperatureMin;
var dailytempmax =  response.data.daily.data[0].temperatureMax;
console.log(`Its currently ${temperature} now. But it already feels like ${apparentTemperature}`);
console.log(`Tomorrow it may vary between ${dailytempmin} and ${dailytempmax}`)
}).catch((e) =>{
if(e.code === 'ENOTFOUND'){
  console.log(e.code);
}else{
  console.log(e.message);
}
});
}
else{
  console.log('address:',argv.address)
  var encodeAddress = encodeURIComponent(argv.address);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;

  axios.get(geocodeUrl).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS'){
      throw new Error('Unable to find the address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
  //  weatherPred(lat,lng);
    var weatherUrl = `https://api.darksky.net/forecast/fd372842dd1c995234e7284bfdd41db2/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  }).then((response)=>{
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    var dailytempmin = response.data.daily.data[0].temperatureMin;
    var dailytempmax =  response.data.daily.data[0].temperatureMax;
    console.log(`Its currently ${temperature} now. But it already feels like ${apparentTemperature}`);
    console.log(`Tomorrow it may vary between ${dailytempmin} and ${dailytempmax}`)
  }).catch((e) =>{
    if(e.code === 'ENOTFOUND'){
      console.log(e.code);
    }else{
      console.log(e.message);
    }
  });
}
// var weatherPred = (lat,lng) =>{
//   var weatherUrl = `https://api.darksky.net/forecast/fd372842dd1c995234e7284bfdd41db2/${lat},${lng}`;
//   console.log(response.data.results[0].formatted_address);
//   return axios.get(weatherUrl).then((response)=>{
//   var temperature = response.data.currently.temperature;
//   var apparentTemperature = response.data.currently.apparentTemperature;
//   var dailytempmin = response.data.daily.data[0].temperatureMin;
//   var dailytempmax =  response.data.daily.data[0].temperatureMax;
//   console.log(`Its currently ${temperature} now. But it already feels like ${apparentTemperature}`);
//   console.log(`Tomorrow it may vary between ${dailytempmin} and ${dailytempmax}`)
// }).catch((e) =>{
//   if(e.code === 'ENOTFOUND'){
//     console.log(e.code);
//   }else{
//     console.log(e.message);
//   }
//
// });
// }
