// test of command line arguments with THETA S
// uses request module
var request = require("request");

// create an object of common URIs to access THETA
function ThetaUri() {
  this.base = 'http://192.168.1.1/osc';
  this.execute = this.base + '/commands/execute';
  this.info = this.base + '/info';
  this.state = this.base + '/state';
}

function getArgs() {
  // remove the first two elements of the array
  var args = process.argv.slice(2);
  // check to make sure at least one argument was given
  if (args.length <= 0) {
    console.log("\n\n" + "Error: no argument found" );
    console.log("Usage: node theta-battery.js battery")
    return;
  } else {
    return args;
  }
}


// instantiate object
var thetaUri = new ThetaUri();
// grab args
var userArgs = getArgs();

if (userArgs != undefined) {
  if (userArgs[0] == "battery") {
    request({
      method: 'POST',
      uri: thetaUri.state
    }, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var result = JSON.parse(body);
        var batteryLevel = result.state.batteryLevel;
        if (batteryLevel === 1) {
          console.log("\n Battery is at full capacity. Rock on!");
        } else if (batteryLevel === 0.67) {
          console.log("\n Battery is at 67% capacity. Keep shooting.");
        } else if (batteryLevel === 0.33) {
          console.log("\n Battery is at 33% capacity. Charge it.");
        } else if (batteryLevel === 0.0) {
          console.log("\n Battery is depleted. Charge it.");
        } else {
          console.log("Program is not working.");
        }
      }
    }
    )
  } else {
    console.log("\n\n Usage: node theta-battery.js battery");
    console.log("\n " + userArgs[0] + " is not currently supported");
  }
}
