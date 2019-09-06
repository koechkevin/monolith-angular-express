require("@babel/polyfill");
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import {register, listUsers} from './auth'

dotenv.config();
const port = process.env.PORT||3000;

const app = express();

app.use(bodyParser.json());

app.post('/api/register', register);
app.get('/api/users', listUsers);

const DIST = path.resolve(__dirname, '..', 'blog');
app.use(express.static(DIST));
app.use('*', (req, res) => res.sendFile(path.resolve(DIST, 'index.html')));

app.listen(port, () => console.log(`listening on port ${port}`));
