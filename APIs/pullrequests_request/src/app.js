const express = require('express')
const app = express()
const router = express.Router()
//Rotas
const pullrequestRoute = require('./routes/pullrequestRoute')

app.use('/pullrequests', pullrequestRoute)

module.exports = app