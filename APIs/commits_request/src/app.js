const express = require('express')
const app = express()
const router = express.Router()
//Rotas
const commitRoute = require('../src/routes/commitsRoute')

app.use('/commits', commitRoute)

module.exports = app
