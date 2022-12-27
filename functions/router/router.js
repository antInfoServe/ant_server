const express = require('express')
const router = new express.Router
const fbaseAuth = require('../middleware/fbaseAuth')

const { controller } = require('../provider/provider')

router.get('/api/v1/setting', fbaseAuth, (req, res, next) => controller.method(req, res, next))


module.exports = router