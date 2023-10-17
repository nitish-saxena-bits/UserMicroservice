/*
-- Create the users table
use `user_db`;
CREATE TABLE `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `fname` VARCHAR(255) NOT NULL,
    `lname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `date_created` INT NOT NULL,
    `date_updated` INT DEFAULT 0 NOT NULL
);
INSERT INTO `users` VALUES(0, 'F1', 'L1', 'n@m.com', UNIX_TIMESTAMP(), UNIX_TIMESTAMP());
INSERT INTO `users` VALUES(0, 'F2', 'L2', 's@m.com', UNIX_TIMESTAMP(), UNIX_TIMESTAMP());
INSERT INTO `users` VALUES(0, 'F3', 'L3', 'nb@m.com', UNIX_TIMESTAMP(), UNIX_TIMESTAMP());
INSERT INTO `users` VALUES(0, 'F4', 'L4', 'y@m.com', UNIX_TIMESTAMP(), UNIX_TIMESTAMP());
*/

// Steps:
// 1. Create a mysql table using above schema.
// 2. Update Database details in the config variable of this file.
// 3. Run this script using node index.js
// 4. Go to http://localhost:3001/users to see if a list of user is returned in response.

const express = require('express');
const mysql = require('mysql2');
const app = express();

const {
  USERMS_PORT: PORT,
  MYSQL_HOST: HOST,
  MYSQL_USER: USER,
  MYSQL_PASSWORD: PASSWORD,
  MYSQL_DB: DB
} = process.env;

const config = {
  port: PORT,
  database: {
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DB,
  },
};

const port = config.port;

const db = mysql.createConnection(config.database);

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(express.json());

app.get('/', (req, res) => {
  res.status(403).send('Access Forbidden');
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(results[0]);
  });
});

app.get('/health-check', (req, res) => {
  console.log('Service is running');
  res.send('Ok');
});

app.listen(port, () => {
  console.log(`User Service is listening on port ${port}`);
});
