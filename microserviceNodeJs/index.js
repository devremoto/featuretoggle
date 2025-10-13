const app = require('./app/config/express');
const consts = require('./app/config/config');
const connection = require('./app/infra/mongo-connection');

console.log('Configuration:', JSON.stringify(consts, null, 2));

// Add proper error handling for MongoDB connection
connection.createConnection()
    .then(() => {
        console.log('Database connection established successfully');
        app.start();
    })
    .catch((error) => {
        console.error('Failed to connect to database:', error);
        console.error('Application will continue without database connection');
        // Start the app anyway so Swagger is still accessible
        app.start();
    });

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Promise Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
});
