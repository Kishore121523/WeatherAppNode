const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=829f478d954ff5c64155c0238121741b&query=${latitude},${longitude}}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined, undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined, undefined);
    } else {
      callback(
        undefined,
        response.body.current.weather_descriptions[0],
        `Currently it is ${response.body.current.temperature} celsius out and feels like ${response.body.current.feelslike} celsius`
      );
    }
  });
};

module.exports = forecast;
