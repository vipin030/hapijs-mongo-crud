'use strict'

const Boom = require('boom');

exports.todo = {
	listTodo: async function(request) {
		const db = request.mongo.db;
    	try {
    		const result = await db.collection('todos').find().sort({created_at:1}).toArray();
        	return result;
    	}
    	catch(err) {
    		throw Boom.internal('Internal Mongodb Error', err)
    	}
	},

	createTodo: async function(request) {
		const db = request.mongo.db;
		try {
			console.log(request.payload.name)
			const result = await db.collection('todos').insertOne({name: request.payload.name, completed: false, created_at: new Date(), updated_at: new Date()});
        	return result;
		}
		catch(err) {
			throw Boom.internal('Internal Mongodb Error', err);
		}
	},

	updateTodo: async function(request) {
		const db = request.mongo.db;
		const ObjectID = request.mongo.ObjectID;
		try {
			const result = await db.collection('todos').updateOne({_id: new ObjectID(request.params.id)}, {completed: request.payload.completed, updated_at: new Date()});
			return result;
		}
		catch(err) {
			throw Boom.internal('Internal Mongodb Error', err);
		}
	},

	deleteTodo: async function(request) {
		const db = request.mongo.db;
		const ObjectID = request.mongo.ObjectID;
		try {
			const result = await db.collection('todos').deleteOne({_id: new ObjectID(request.params.id)});
			return result;

		}
		catch(err) {
			throw Boom.internal('Internal Mongodb Error', err);
		}

	}
}