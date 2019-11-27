const express = require('express')
const router = express.Router()
const commitController = require('../controllers/commitController')

router.get('/', commitController.get)

module.exports = router
