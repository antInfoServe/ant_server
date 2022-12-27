const functions = require("firebase-functions");
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require("firebase-functions/lib/logger/compat");

const app = express()



const allowedOrigins = ['http://localhost:5000', 'http://localhost:5001']

app.use(cors({
  origin: function (origin, callback) {
    // do not allow requests with no origin 
    if (!origin) return callback(null, false);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = `The CORS policy for this site does not allow access from the specified Origin [ ${origin} ].`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(morgan('combined'))
app.use(bodyParser.json())

app.use((err, req, res, next) => {
  const arr = [400, 401, 402, 403, 404, 405, 406]
  if (arr.includes(err.code)) {
    res.status(err.code).send(JSON.stringify(err))
    return
  }
  res.status(500).send(JSON.stringify({code:500, message:'something went wrong. Please click "refresh" or try again later.'}))
})

//exports the api to the firebase functions
exports.app = functions.region('asia-south1').https.onRequest(app)