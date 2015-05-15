/*
create a basic hapi server on port 8000 
which responds to /version requests and 
replies with a simple { "version": "0.0.1" } JSON payload. 
The version in the response should come from the package.json file.
*/

var Hapi = require("hapi");

var Version = require("./version");
var Private = require("./private");

var internals = {};

internals.init = function(port, next){

	var server = internals.server = new Hapi.Server();

	server.connection({
		port: port
	});

	server.register([Version, Private], function(err){

		if(err){
			return next(err);
		}

		server.start(function(err){
			return next(err, server);
		});

		return;
		
	});
}


module.exports = internals;
