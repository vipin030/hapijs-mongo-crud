const Hapi = require('hapi');
const Boom = require('boom');
const Joi = require('joi');
const fs = require('fs');

const Route = require('./app/route');

const server = Hapi.Server({port: 3000})

const launchServer = async function() {
    
    const dbOpts = {
    	url: 'mongodb://localhost:27017/test',
    	settings: {
    		poolSize: 10
    	},
    	decorate: true
    }

	const request = server.events.on('response', function (request) {
		const logStream = fs.createWriteStream('logs/user_log', { flags: 'a' });
		let logData = `{ip:${request.info.remoteAddress}, method: ${request.method.toUpperCase()}, path: ${request.url.path}, status_code: ${request.response.statusCode}, data: ${JSON.stringify(request.payload)}, timestamp: ${new Date()}}\n`;
		logStream.write(logData);
		logStream.end();
	})

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

module.exports = server