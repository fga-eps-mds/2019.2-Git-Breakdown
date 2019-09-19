const express = require('express')
const app = express()
const router = express.Router()
//Rotas
const index = require('./routes/index')
const issueRoute = require('./routes/issueRoute')

app.use('/', index)
app.use('/issues', issueRoute)

module.exports = app