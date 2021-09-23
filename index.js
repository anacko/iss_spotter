const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work! ", error);
//     return;
//   }

//   console.log("It worked! IP: ", ip);
// });

// fetchCoordsByIP("142.120.136.145", (error, ip) => {
//   if (error) {
//     console.log("It didn't work! ", error);
//     return;
//   }

//   console.log("It worked! IP: ", ip);
// });

// fetchISSFlyOverTimes({ latitude: "45.3548", longitude: "-75.5773" }, (error, times) => {
//   if (error) {
//     console.log("It didn't work! ", error);
//     return;
//   }
//   console.log("It worked! ", times);
// });