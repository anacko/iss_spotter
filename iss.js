const request = require('request');

const nextISSTimesForMyLocation = function(callback) {
  
  // Get the IP
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback([error, response], null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const dataIP = JSON.parse(body).ip;

    // Use IP to get coordinates {latitude, longitude}
    request("https://freegeoip.app/json/" + dataIP, (error, response, body) => {
      if (error) {
        callback([error, response], null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const coords = JSON.parse(body);
      
      // Use coordinates to get times
      request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
        if (error) {
          callback([error, response], null);
          return;
        }
        if (response.statusCode !== 200) {
          const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
          callback(Error(msg), null);
          return;
        }
        const timesInfo = JSON.parse(body).response;

        let timesStr = [];
        let dateObj;
        for (let elem of timesInfo) {
          dateObj = new Date(elem.risetime*1000);
          timesStr.push("Next pass at " + dateObj + " for " + elem.duration + " seconds.");
        }
        timesStr = timesStr.join(`\n`)
        callback(null, timesStr);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };