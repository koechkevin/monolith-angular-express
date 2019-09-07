import * as admin from 'firebase-admin';
import env from 'dotenv';

env.config();


const config = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(config),
  databaseURL: 'https://backend-fff45.firebaseio.com/'
});
const database = admin.database();


export default database;
