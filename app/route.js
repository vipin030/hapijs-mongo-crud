'use strict'

const Handler = require('./handler');

exports.load = [
	{ path: '/todo', method: 'POST', handler: Handler.todo.createTodo },
	{ path: '/todo', method: 'GET', handler: Handler.todo.listTodo },
	{ path: '/todo/{id}', method: ['PATCH','PUT'], handler: Handler.todo.updateTodo },
	{ path: '/todo/{id}', method: 'DELETE', handler: Handler.todo.deleteTodo }
];