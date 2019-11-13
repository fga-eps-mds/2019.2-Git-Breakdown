const express = require('express')
const router = express.Router()
const organizationController = require('../controllers/organizationController')

router.get('/', organizationController.get)

module.exports = router