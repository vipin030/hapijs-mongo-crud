const Hapi = require('hapi');
const Boom = require('boom');
const Joi = require('joi');

const Route = require('./app/route');
 
const launchServer = async function() {
    
    const dbOpts = {
    	url: 'mongodb://localhost:27017/test',
    	settings: {
    		poolSize: 10
    	},
    	decorate: true
    }

    const server = Hapi.Server({port: 3000})
 	await server.route(Route.load);
 	await server.register({
 		plugin: require('hapi-mongodb'),
 		options: dbOpts
 	})
 	
    await server.start();
    console.log(`Server started at ${server.info.uri}`);
};
 
launchServer().catch((err) => {
    console.error(err);
    process.exit(1);
});