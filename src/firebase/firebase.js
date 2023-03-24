require('dotenv').config();
import admin from 'firebase-admin';


let serviceAccount = process.env.GOOGLE_CREDENTIALS;
console.log("hola amigos ", serviceAccount)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
