const express = require('express')
const router = express.Router()
const get_infos = require('../controllers/infosController')


router.get('/', (req , res) => {
    res.send("ok")
})

router.get('/infos', get_infos.get)


module.exports = router;
