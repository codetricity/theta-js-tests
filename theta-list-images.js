var request = require("request");

request({
   method: 'POST',
   uri: 'http://192.168.1.1:80/osc/commands/execute',
   body: JSON.stringify({
      name: "camera.listImages",
      parameters: {
        "entryCount": 3,
        "includeThumb": false
      }
   })
}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
     console.log(body);
  } else {
    console.log("there was an error " + error, body);
  }
}
);
