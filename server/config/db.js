const mysql = require('mysql2');
require('dotenv').config();

console.log('Attempting to create database connection pool...');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 60000, // Increase timeout to 60 seconds
    ssl: {
        rejectUnauthorized: true
    },
    // Add additional connection settings
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
}).promise();

// Test the connection with timeout handling
const testConnection = async () => {
    try {
        console.log('Testing database connection...');
        await pool.query('SELECT 1');
        console.log('Database connection successful');
    } catch (err) {
        console.error('Database connection failed:', {
            message: err.message,
            code: err.code,
            errno: err.errno
        });
        // Don't exit the process, but log the error
        console.error('Please check your database credentials and network connection');
    }
};

testConnection();

module.exports = pool;