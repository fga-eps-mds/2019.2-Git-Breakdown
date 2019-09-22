const express = require('express')
const app = express()
const router = express.Router()
//Rotas
const index = require('./routes/index')
const pullrequestRoute = require('./routes/pullrequestRoute')

app.use('/', index)
app.use('/pullrequests', pullrequestRoute)

module.exports = app