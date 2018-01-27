'use strict'
const Joi = require('joi');

const Handler = require('./handler');
const todoValidate = require('./validate/todo').todoValidate;


exports.load = [
	{ path: '/todo', method: 'POST', config: { validate: todoValidate.createTodo }, handler: Handler.todo.createTodo },
	{ path: '/todo', method: 'GET', handler: Handler.todo.listTodo },
	{ path: '/todo/{id}', method: ['PATCH','PUT'], config: {  validate: todoValidate.updateTodo}, handler: Handler.todo.updateTodo },
	{ path: '/todo/{id}', method: 'DELETE', config: { validate: todoValidate.deleteTodo }, handler: Handler.todo.deleteTodo }
];