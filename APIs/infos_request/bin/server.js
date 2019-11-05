const express = require('express')
const app = express()
const routes = require('../src/routes/infosRoute')


app.use('/', routes)
app.use('/infos', routes)

app.listen(3006)