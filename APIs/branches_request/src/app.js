const express = require('express')
const app = express()
const router = express.Router()

const branchRoute = require('./routes/branchRoute')

app.use('/branches', branchRoute)

module.exports = app