'use strict'
const Joi = require('joi');


exports.todoValidate =(function() {

	return {
		createTodo: {
			payload: (function payload() {
				return {
					name: Joi.string().min(10).max(100).required()
				}
			})()
        },
        updateTodo: (function updateTodo() {
        	return {
        		params: {
        			id: Joi.string().min(10).max(100).required()
        		},
        		payload: {
        			completed: Joi.boolean().required()
        		}
        	}
        })(),
        deleteTodo: {
        	params: (function params() {
        		return {
        			id: Joi.string().min(10).max(100).required()
        		}
        	})()
        }


    }
})();