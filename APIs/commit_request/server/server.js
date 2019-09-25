const express = require('express')
const app = express()
const routes = require('../routes/commitRoute')


app.use('/', routes)
app.use('/index', routes)
app.use('/commits', routes)

app.listen(3001)