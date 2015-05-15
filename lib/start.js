var Hoek = require("hoek");
var Server = require("./index");

//var internals = {};

Server.init(8000, function(err, server){
	Hoek.assert(!err, err);

	console.log("server started with success at: ", server.info.uri);
});
/**/