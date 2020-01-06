const redis = require('redis');
const consts = require('../config/config');
const REDIS_SERVER = process.env.REDIS_SERVER || consts.REDIS_SERVER;
const REDIS_PORT = process.env.REDIS_PORT || consts.REDIS_PORT;

module.exports.createConnection = () => {
	let client = redis.createClient(REDIS_PORT, REDIS_SERVER);

	// if you'd like to select database 3, instead of 0 (default), call
	// client.select(3, function() { /* ... */ });

	client.on('error', function(err) {
		console.log('Error ' + err);
	});

	return client;
};
