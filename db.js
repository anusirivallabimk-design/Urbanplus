const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, ".env")
});

const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

console.log("Database configuration:", {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    passwordLoaded: typeof process.env.DB_PASSWORD === "string"
        && process.env.DB_PASSWORD.length > 0
});

module.exports = pool;