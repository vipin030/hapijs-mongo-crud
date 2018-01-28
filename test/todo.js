import test from 'ava';
import server from '../server';

const requestDefaults = {
  method: 'POST',
  url: '/todo',
  payload: {}
};

test('endpoint test | POST /todo | empty payload -> 400 Bad Request', async t => {
  const request = Object.assign({}, requestDefaults);

  const response = await server.inject(request);
  t.is(response.statusCode, 400, 'status code is 400');
});

test('endpoint test | POST /todo | empty invalid payload -> 400', async t => {
  const request = Object.assign({}, requestDefaults, {
  	payload: {
  		name: 'wanna'
  	}
  });

  const response = await server.inject(request);
  t.is(response.statusCode, 400, 'status code is 400');
});

var todoId = "";

test('endpoint test | POST /todo | with valid  payload  -> 200', async t => {
  const request = Object.assign({}, requestDefaults, {
  	payload: {
  		name: 'Wanna buy milk'
  	}
  });
  const response = await server.inject(request);
  todoId = response.result.insertedId;
  t.is(response.statusCode, 200, 'status code is 200');
});

const requestGetDefaults = {
  method: 'GET',
  url: '/todo',
  payload: {}
};

test('endpoint test | GET /todo | List data-> 200', async t => {
  const request = Object.assign({}, requestGetDefaults);

  const response = await server.inject(request);
  t.is(response.statusCode, 200, 'status code is 200');
});

// Makesure You have below id  in the db before running the test
const requestPutDefaults = {
  method: 'PUT',
  url: `/todo/5a6da75d25f6cc09e6be2194`,
  payload: {}
};

test('endpoint test | PUT /todo | with Invalid datatype -> 400', async t => {
  const request = Object.assign({}, requestPutDefaults, {
  	payload: {
  		completed: 'truee'
  	},
  });

  const response = await server.inject(request);
  t.is(response.statusCode, 400, 'status code is 400');
});

test('endpoint test | PUT /todo | with valid datatype -> 200', async t => {
  const request = Object.assign({}, requestPutDefaults, {
  	payload: {
  		completed: 'true'
  	},
  });

  const response = await server.inject(request);
  t.is(response.statusCode, 200, 'status code is 200');
});

const requestDelDefaults = {
  method: 'DELETE',
  url: '/todo/5a6cdd301f9c096b8d',
  payload: {}
};

test('endpoint test | DELETE /todo | with Invalid id -> 500', async t => {
  const request = Object.assign({}, requestDelDefaults);

  const response = await server.inject(request);
  t.is(response.statusCode, 500, 'status code is 500');
});
// Makesure You have below id  in the db before running the test
test('endpoint test | DELETE /todo | with valid id -> 200', async t => {
  const request = Object.assign({}, requestDelDefaults, {url: `/todo/5a6da75d25f6cc09e6be2194`});

  const response = await server.inject(request);
  t.is(response.statusCode, 200, 'status code is 200');
});