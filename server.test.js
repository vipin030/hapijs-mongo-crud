//assertions
var hapiTest = require('hapi-test'),
    plugin = require('./server.js'),
    assert = require('chai').assert;
 
hapiTest({ plugins: [ plugin ] })
    .get('/')
    .end(function (result) {
        assert(result.statusCode === 200);
    });