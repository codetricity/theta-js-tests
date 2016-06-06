var request = require("request");
var thetaExecute ='http://192.168.1.1/osc/commands/execute';
var sessionId = "";

function handler(error, response, body) {
  if (!error && response.statusCode == 200) {
    var result = JSON.parse(body);
    sessionId = result.results.sessionId;
    console.log(sessionId, result);
    getOptions();
    sleepDelay(600);
    getOptions();
  } else {
    console.log(error, body);
  }
}

var startSession = function() {
  request({
    method: 'POST',
    uri: thetaExecute,
    body: JSON.stringify({
      name: 'camera.startSession',
      parameters: {}
    })}, handler
  );
}

// get options
var getOptions = function() {
  request({
      method: 'POST',
      uri: thetaExecute,
      body: JSON.stringify({
        name: 'camera.getOptions',
        parameters: {
          "sessionId": sessionId,
          "optionNames": [
            "offDelay",
            "_shutterVolume",
            "sleepDelay"
          ]
        }})
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var result = JSON.parse(body);
          console.log(body);
        } else {
          console.log(error, body);
        }
      }
  );
}
// end getOptions

var sleepDelay = function(delay) {
  request({
    method: 'POST',
    uri: thetaExecute,
    body: JSON.stringify({
      name: 'camera.setOptions',
      parameters: {
        "sessionId": sessionId,
        "options": {
          "sleepDelay": delay
        }
      }
    })
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var result = JSON.parse(body);
      console.log(body);
    } else {
      console.log(error, body);
    }
  }
);
}

// begin main program

startSession();
