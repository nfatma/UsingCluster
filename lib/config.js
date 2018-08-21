/*
 *
 *configuration file
 *
 */

 //Container for all the environments
 var environments = {};

 //Staging (default) environment
 environments.staging = {
 	'httpPort' : 3000,
 	'envName' : 'Staging'
 };

 //Production environment
 environments.production = {
 	'httpsPort' : 5000,
 	'envName' : 'Production'
 };

 //Determine which environment was passed as a command-line argument
 var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

 //Check that the current environment is one of the environment above, if not, default to staging
 var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

 //Export the module
 module.exports = environmentToExport;