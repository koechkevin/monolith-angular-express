import * as admin from 'firebase-admin';
import env from 'dotenv';

env.config();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://backend-fff45.firebaseio.com/'
});
const database = admin.database();


export default database;
