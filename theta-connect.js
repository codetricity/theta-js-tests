var http = require('http');
var url = require('url');

var server = http.createServer(function (request, response) {
  var pageBody = '';
  var queryData = url.parse(request.url, true).query;
  response.writeHead(200, {"Content-Type": "text/html"});
  if (!queryData.command) {
    response.end('<h1>THETA controller test</h1>' +
      '<a href=/?command=state>Get state of THETA</a>');
  }

  if (queryData.command) {
    // user told us command in the GET request, ex: http://host:8000/?command=takePicture
    response.end('the command is ' + queryData.command + '\n');
    if (queryData.command == 'state') {
      console.log('will output state');
    }

  } else {
    response.end("command not supported\n");
  }
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8080);
