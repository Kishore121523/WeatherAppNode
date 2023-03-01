const request = require('request')

const forecast = (latitude,longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=829f478d954ff5c64155c0238121741b&query=${latitude},${longitude}}&units=f`;

  request({url:url, json:true}, (error, response)=>{

    if(error){
      callback("Unable to connect to weather service", undefined);
    }else if (response.body.error){
      callback("Unable to find location", undefined);
    }else{
      callback(
        undefined,
        `${response.body.current.weather_descriptions[0]} --- It is currently ${response.body.current.temperature} farenheit out. It feels like ${response.body.current.feelslike} farenheit`
      );
    }
  })
}

module.exports = forecast