const express = require('express')
const router = express.Router()
const issueController = require('../controllers/issueController')
const rankingController = require('../controllers/rankingController')

router.get('/', issueController.get)
router.post('/', issueController.post)
router.put('/:id', issueController.put)
router.delete('/:id', issueController.delete)
router.get('/ranking', rankingController.get)

module.exports = router