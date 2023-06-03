const { initializeApp, cert } = require('firebase-admin/app');
const {getAuth} = require('firebase-admin/auth')
const {getFirestore, Timestamp, FieldValue} = require('firebase-admin/firestore')
const serviceAccountKeys = require('../joyboy-ai-firebase-adminsdk-a75r4-0a8645d28c.json')

const app = initializeApp({
    credential: cert(serviceAccountKeys),
})



module.exports={
    getAuth: getAuth(app),
    db: getFirestore(),
    Timestamp, 
    FieldValue
}