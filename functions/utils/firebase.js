const { initializeApp, cert } = require('firebase-admin/app');
const {getAuth} = require('firebase-admin/auth')
const {getFirestore, Timestamp} = require('firebase-admin/firestore')
const serviceAccountKeys = require('../dezinstudio-2ad1d-firebase-adminsdk-vmfy8-2828c3052b.json')

const app = initializeApp({
    credential: cert(serviceAccountKeys),
    databaseURL:"https://dezinstudio-2ad1d.firebaseio.com"
})



module.exports={
    getAuth: getAuth(app),
    db: getFirestore(),
    Timestamp
}