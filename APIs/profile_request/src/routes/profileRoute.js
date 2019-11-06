const express = require('express')
const router = express.Router()
const get_profile = require('../controllers/profileController')


router.get('/', (req , res) => {
    res.send("ok")
})

router.get('/profile', get_profile.get)


module.exports = router;
