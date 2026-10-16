const AWS = require('aws-sdk');
const mongoose = require("mongoose");
const colors = require("colors");

AWS.config.update({ region: process.env.AWS_REGION });

const connectDB = async () => {
  try {
    const endpoint = process.env.DOCDB_ENDPOINT; // DocumentDB endpoint or instance
    const secretName = process.env.SECRET_NAME; // Your secret name
    const db = process.env.MONGO_INITDB_DATABASE; // Your database name
    const username = process.env.MONGO_INITDB_ROOT_USERNAME; // Your database name
    const password = process.env.MONGO_INITDB_ROOT_PASSWORD

    console.log("Connecting to MongoDB with the following credentials:");
    console.log(`DOCDB Endpoint: ${endpoint}`);

    // Construct the connection string with database name 'chatapp'
    const conn = await mongoose.connect(`mongodb://${username}:${password}@${endpoint}:27017/${db}?authSource=admin`,
	    { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};


// Listen for Mongoose connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
    dbConnected = true; // Ensure this is set when connected
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from DB');
    dbConnected = false; // Reset when disconnected
});

mongoose.connection.on('error', (error) => {
    console.error(`Mongoose connection error: ${error}`);
});

module.exports = connectDB;

