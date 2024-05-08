const mongoose = require('mongoose');

let connection; // Singleton instance for the database connection

const connectDB = async () => {
    if (connection) {
        // If connection is already established, return the existing connection
        return connection;
    }

    try {
        // Create a new database connection
        connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connection successful.");

        return connection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error; // Throw error to indicate connection failure
    }
};

// Export the connectDB function
module.exports = connectDB;
