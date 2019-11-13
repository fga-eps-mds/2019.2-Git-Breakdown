const express = require('express')
const router = express.Router()
const issueController = require('../controllers/organizationController')

router.get('/', organizationController.get)

module.exports = router