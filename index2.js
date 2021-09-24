const { nextISSTimesForMyLocation, timesToPrint } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then(timesToPrint)
  .catch((error) => console.log("It didn't work: ", error.message));