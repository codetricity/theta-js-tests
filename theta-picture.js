var request = require("request");
var sessionId = '';

request({
   method: 'POST',
   uri: 'http://192.168.1.1:80/osc/commands/execute',
   body: JSON.stringify({
      name: "camera.startSession",
      parameters: {
      }
   })
}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
     var result = JSON.parse(body);
     sessionId = result.results.sessionId;
//    console.log(result, result.results.sessionId);
// end of code that is run if there is a successful session
// since the session was successfully started, run the next command
  console.log(sessionId);
  request({
    method: 'POST',
    uri: 'http://192.168.1.1/osc/commands/execute',
    body: JSON.stringify({
      name: "camera.takePicture",
      parameters: {
       "sessionId": sessionId
      }
    })
  }, // end of request call
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var result = JSON.parse(body);
        console.log(result);
      } else {
        console.log(error, body);
      }

    }
); // end of request method

  } else {
    console.log("there was an error " + error, body);
  }
}
);
