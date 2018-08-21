/*
 * Primary file for API
 *
 */

//Dependencies
var server = require('./lib/server');
var cli = require('./lib/cli');
var cluster = require('cluster');
var os = require('os');

//Create a container for app
var app = {};

//
app.init = function(){

  if(cluster.isMaster){
  	//Start the CLI, but make sure it starts last
  	setTimeout(function(){
  	cli.init();
  	},50);

  	// Fork the process explicitly
  	for(var j = 0; j < os.cpus().length; j++){
  		cluster.fork();
  	}

  } else {
  	
  	// Start the server, if we are not in master thread
  	server.init();
  	 }
 };


// Execute
app.init();

// Export the app
module.exports = app;