/*
 *Creating library for welcome messages
 */

//Dependencies
 var fs1 = require('fs');

 //App Objeect

 var wMssg = {};

 //Get all the jokes and return them to the user
 wMssg.allmssg  =function(){

 	//Read the text file containing the jokes
 	var fileContents = fs1.readFileSync(__dirname+'/welcomeMssg.txt','utf8');

 	//Turn the string into an array
 	var arrayOfmssg = fileContents.split(/\r?\n/);

 	//return the array
 	return arrayOfmssg;

 };
 //export the library
 module.exports = wMssg;