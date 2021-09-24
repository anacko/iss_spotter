const request = require('request-promise-native');

// Gets IP from ipify.org. The return is a promise.
const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
}

// Gets coords from IP
const fetchCoordsByIP = function(body) {
  const dataIP = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${dataIP}`);
}

// Get times from coords
const fetchISSFlyOverTimes = function(body) {
  const coords = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitudes}&lon=${coords.longitude}`)
}

// Chain
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(body => JSON.parse(body).response)
}

const timesToPrint = function(response) {

  let timesStr = [];
    let dateObj;
    for (let elem of response) {
      dateObj = new Date(elem.risetime*1000);
      timesStr.push("Next pass at " + dateObj + " for " + elem.duration + " seconds.");
    }
    timesStr = timesStr.join(`\n`);
    return console.log(timesStr);
}

module.exports = { nextISSTimesForMyLocation, timesToPrint };