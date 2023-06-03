const express = require('express')
const router = new express.Router
const firebaseAuth = require('../middleware/firebaseAuth')

const { controller } = require('../provider/provider')

router.get('/api/v1/setting', firebaseAuth, (req, res, next) => controller.method(req, res, next))


module.exports = router