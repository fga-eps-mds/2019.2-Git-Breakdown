const express = require('express')
const app = express()
const router = express.Router()
//Rotas
const index = require('./routes/index')
const pullrequestRoute = require('./routes/organitazionRoute')

app.use('/', index)
app.use('/organizations/status', organizationRoute)

module.exports = app