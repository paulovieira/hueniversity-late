var Users = require('./users.json');
var HapiAuthBasic = require('hapi-auth-basic');

var internals = {
    validateFunc: function(username, password, callback) {

        var user = Users[username];
        var isValid = !!user && (user.password === password);

        return callback(null, isValid, {
            id: user.username,
            name: user.name
        });

    }
};


exports.register = function(server, options, next) {


    server.register(HapiAuthBasic, function(err) {

    	if(err){
    		return next(err);
    	}

        server.auth.strategy('simple', 'basic', {
            validateFunc: internals.validateFunc
        });

        // server.route({
        //     method: 'GET',
        //     path: '/',
        //     config: {
        //         auth: 'simple'
        //     }


        // if the basic auth plugin registration went ok, proceed to register the route

        server.route({
            method: "GET",
            path: "/private",
            handler: function(request, reply) {
                return reply("hello " + request.auth.credentials.name);
            },
            config: {
                auth: 'simple'
            }
        });


        return next();

    });


};

exports.register.attributes = {
    name: "private"
};
/*
 */
