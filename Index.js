/*
 * Primary file for API
 *
 */

//Dependencies
var server = require('./lib/server');
var cli = require('./lib/cli');

//Create a container for app
var app = {};

//
app.init = function(){

  // Start the server
  server.init();

  //Start the CLI, but make sure it starts last
  setTimeout(function(){
  	cli.init();
  },50);

};


// Execute
app.init();

// Export the app
module.exports = app;