// Import the mongoose library
const { connect, connection } = require('mongoose');

// Connect to MongoDB database using the MongoDB URI provided in the environment
const connectionString =
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetworkDB';

connect(connectionString);

// Export connection 
module.exports = connection;