const express = require('express')
const app = express()
const router = express.Router()
//Rotas
const index = require('./routes/index')
const rankingRoute = require('./routes/rankingRoute')

app.use('/', index)
app.use('/ranking', rankingRoute)

module.exports = app