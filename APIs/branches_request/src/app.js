const express = require('express')
const app = express()
const router = express.Router()

const index = require('./routes/index')
const branchRoute = require('./routes/branchRoute')

app.use('/', index)
app.use('/branches', branchRoute)

module.exports = app