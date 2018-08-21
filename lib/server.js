/*
 * Primary file
 *
 */

 //Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var wMssgLib = require('./welcomeMssg');

// Server object
var server = {};

//Instantiating the http server
server.httpServer = http.createServer(function(req,res){
	//Get the URL and parse it
	var parsedUrl = url.parse(req.url,true);

	//Send the path
	var path = parsedUrl.pathname;
	var trimmedPath = path.replace(/^\/+|\/+$/g,'');

	//Get the payloads, if any
	var decoder = new StringDecoder('utf-8');
	var buffer = '';
	req.on('data',function(data){
		buffer += decoder.write(data);
	});
	req.on('end',function(){
		buffer += decoder.end();

	//choose handler this request should go to . If one is not found, use the notFound handler
	var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

	// Contruct the data onject to send to the handler
	var data = {
		'trimmedPath' : trimmedPath,
		'payload' : buffer
	};

	// Route the request to the handler specified in the router
	chosenHandler(data,function(statusCode,payload){


	//Use the statusCode called back by the handler, or default handler
	statusCode = typeof(statusCode) == 'number' ? statusCode: 200;

	//Use the payload called back by the handler, or default to
	payload = typeof(payload) == 'object' ? payload : {};

	//Convert the payload to a string
	var payloadString = JSON.stringify(payload);

	//Return the response
	res.setHeader('Content-Type','application/json');
	res.writeHead(statusCode);
	res.end(payloadString);

	//Log the request path
	console.log('returning this response: ',statusCode,payload);
	});
});

});


// Get all the messsages
 var allmssg = wMssgLib.allmssg();

 //Declare i = 0
 var i = 0;

//Create a loop function that print 5 welcome messages sequentially after every second
server.myLoop = function() {           
   setTimeout(function () {    
      console.log('\x1b[36m%s\x1b[0m',allmssg[i]);          
      i++;                     
      if (i < 5) {            
         server.myLoop();             
      }                       
   }, 2000)
}

//Define handlers
var handlers ={};

//Not found handler
handlers.notFound = function(data,callback){
	callback(404);
};

//ping handler
handlers.hello = function(data,callback){
	//callback a http status code, and a payload object
	callback(200,{'message': server.myLoop()});
};

//Define a request router
var router = {
	'hello' : handlers.hello
};

// init function of the server
server.init = function() {

// Start the HTTP server
server.httpServer.listen(config.httpPort,function(){
  console.log('\x1b[33m%s\x1b[0m','The HTTP server is listening on port '+config.httpPort);
});
};


// Export the server 
module.exports = server;