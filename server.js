const Hapi = require('hapi');
const Boom = require('boom');
const Joi = require('joi');
 
const launchServer = async function() {
    
    const dbOpts = {
    	url: 'mongodb://localhost:27017/test',
    	settings: {
    		poolSize: 10
    	},
    	decorate: true
    }

    const server = Hapi.Server({port: 3000})
 	
 	await server.register({
 		plugin: require('hapi-mongodb'),
 		options: dbOpts
 	})

   	server.route( {
        method: 'GET',
        path: '/',
        async handler(request) {
        	return {message: 'Hello World'}
        }
    });

    server.route( {
    	method: 'GET',
    	path: '/todo',
    	async handler(request) {
    		const db = request.mongo.db;
    		try {
    			const result = await db.collection('todos').find({}).toArray();
        		return result;
    		}
    		catch(err) {
    			throw Boom.internal('Internal Mongodb Error', err)
    		}

    	}
    });
 
    await server.start();
    console.log(`Server started at ${server.info.uri}`);
};
 
launchServer().catch((err) => {
    console.error(err);
    process.exit(1);
});