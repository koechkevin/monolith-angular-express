import * as admin from 'firebase-admin';
import env from 'dotenv';
import path from 'path';

env.config();

admin.initializeApp({
  credential: admin.credential.cert(path.resolve(__dirname, '..', '..', 'credentials.json')),
  databaseURL: 'https://backend-fff45.firebaseio.com/'
});
const database = admin.database();


export default database;
