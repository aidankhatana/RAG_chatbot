const admin = require('firebase-admin');
const config = require('./config');

const firebaseConfig = {
  credential: admin.credential.cert({
    projectId: config.firebase.projectId,
    privateKey: config.firebase.privateKey,
    clientEmail: config.firebase.clientEmail
  })
};

admin.initializeApp(firebaseConfig);
const db = admin.firestore();

module.exports = db; 