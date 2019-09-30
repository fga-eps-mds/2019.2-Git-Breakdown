const express = require('express')
const router = express.Router()
const request = require('request')
const get_commits = require('../controllers/commitController')


router.get('/', (req , res) => {
    res.send("ok")
})

router.get('/index', (req , res) => {
    console.log("/index requested")
    res.send('ok')
})

router.get('/commits', get_commits.get)


module.exports = router;
