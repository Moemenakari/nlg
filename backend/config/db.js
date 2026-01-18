const mysql = require("mysql2/promise");

// Build connection config
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "next_level_games",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Enable SSL for TiDB Cloud and other cloud databases
if (process.env.DB_SSL === "true") {
  dbConfig.ssl = {
    minVersion: "TLSv1.2",
    rejectUnauthorized: true,
  };
}

const pool = mysql.createPool(dbConfig);

// Test connection (don't exit on error during startup - allows build to complete)
pool
  .getConnection()
  .then((connection) => {
    console.log("✅ MySQL Database Connected Successfully");
    connection.release();
  })
  .catch((error) => {
    console.error("❌ Database Connection Error:", error.message);
    console.error("⚠️ Server will continue but database operations may fail");
    // Don't exit - let the server start and handle errors per-request
  });

module.exports = pool;
