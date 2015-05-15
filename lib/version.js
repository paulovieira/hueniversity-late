
var Pkg = require('../package.json');

var internals = {
	versionResp: {
		"version": Pkg.version
	}
};

exports.register = function(server, options, next){

	server.route({
		method: "GET",
		path: "/version",
		handler: function(request, reply){
			return reply(internals.versionResp);
		}
	});

	return next();

};

exports.register.attributes = {
	name: "version"
};
/*
*/