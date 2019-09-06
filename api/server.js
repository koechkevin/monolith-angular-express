import Users from "./database/users";

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
import bodyParser from 'body-parser';

// Bind heroku port from environment variables or assign the port number 4200 when tested on a different environment.
dotenv.config();
const port = process.env.PORT||3000;

// Create an express server.
const app = express();

app.use(bodyParser.json());

app.post('/api/login', async (req, res) => {
  const db = new Users();
  const user = await db.createUser(req.body);
  res.status(200).json(user);
});

app.get('/api/users', async (req, res) => {
  const db = new Users();
  const users = await db.getUsers();
  res.status(200).json(users);
});

// Folder path where the bundled files reside in.
const DIST = path.resolve(__dirname, '..', 'dist/blog');

// Enable our express server to serve bundled static files.
app.use(express.static(DIST));

// Redirects all other routes to index.html file in the DIST directory
app.use('*', (req, res) => res.sendFile(path.resolve(DIST, 'index.html')));

// run the server
app.listen(port, () => console.log(`listening on port ${port}`));
