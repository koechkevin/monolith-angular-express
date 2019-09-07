import * as admin from 'firebase-admin';
import env from 'dotenv';

env.config();

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CONFIG)),
  databaseURL: 'https://backend-fff45.firebaseio.com/'
});
const database = admin.database();


export default database;
