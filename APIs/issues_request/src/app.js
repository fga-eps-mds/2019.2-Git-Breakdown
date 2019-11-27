const express = require('express')
const app = express()
const router = express.Router()
//Rotas
const issueRoute = require('./routes/issueRoute')

app.use('/issues', issueRoute)

module.exports = app