const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_NAME || "sys",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//initialize database

const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    // creating user table if not exists
    // await connection.query(`
    //     CREATE TABLE test (
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     username VARCHAR(50) NOT NULL UNIQUE,
    //     email VARCHAR(100) NOT NULL UNIQUE,
    //     password VARCHAR(255) NOT NULL,
    //     profile_image VARCHAR(255),
    //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    //     )
    // `);

    // Create todos table if it doesn't exist
    // await connection.query(`
    //     CREATE TABLE todos (
    //       id INT AUTO_INCREMENT PRIMARY KEY,
    //       user_id INT NOT NULL,
    //       description TEXT,
    //       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    //       FOREIGN KEY (user_id) REFERENCES test(id) ON DELETE CASCADE
    //     )
    //   `);

    console.log("databse initialized successfull");
    connection.release();
  } catch (err) {
    console.log("Error on initializing database", err);
    process.exit(1);
  }
};

initializeDatabase();

module.exports = {
  pool,
  initializeDatabase,
};
