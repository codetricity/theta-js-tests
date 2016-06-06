var http = require('http');
var url = require('url');
var request = require("request");

var commandState = function() {
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
      console.log(result, result.results.sessionId);
    }
  });
  // end of code that is run if there is a successful session
  // since the session was successfully started, run the next command
    request({
      method: 'POST',
      uri: 'http://192.168.1.1:80/osc/state'
    }, // end of request call
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var result = JSON.parse(body);
          // console.log(result);
          request({
            method: 'GET',
            uri: 'http://localhost:8080?result=' + body
          });
        } else {
      console.log("there was an error " + error, body);
    }
  }
  );
}



var server = http.createServer(function (request, response) {
  var queryResult = '';
  var queryData = url.parse(request.url, true).query;
  response.writeHead(200, {"Content-Type": "text/html"});
  if (!queryData.command) {
    response.end('<h1>THETA controller test</h1>' +
      '<a href=/?command=state>Get state of THETA</a>');


  }

  if (queryData.command) {
    // user told us command in the GET request, ex: http://host:8000/?command=takePicture
    if (queryData.command == 'state') {
      console.log('will output state');
      commandState();
    response.end('the command is ' + queryData.command + '\n');

    }

  }
  if (queryData.result) {
    console.log("this is the result");
    queryResult = queryData.result;
    console.log(queryResult);
    }

});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8080);
console.log("listening on http://localhost:8080")
