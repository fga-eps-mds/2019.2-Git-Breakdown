const express = require('express')
const router = express.Router()
const controller = require('../controllers/rankingController')

router.get('/', controller.get)

module.exports = router