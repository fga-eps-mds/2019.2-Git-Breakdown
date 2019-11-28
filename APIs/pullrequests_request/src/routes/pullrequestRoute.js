const express = require('express')
const router = express.Router()
const pullrequestController = require('../controllers/pullrequestController')
const rankingController = require('../controllers/rankingController')

router.get('/', pullrequestController.get)
router.get('/ranking', rankingController.get)

module.exports = router