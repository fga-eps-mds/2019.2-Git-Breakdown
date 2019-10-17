const express = require('express')
const app = express()
const routes = require('../src/routes/commitsRoute')


app.use('/', routes)
app.use('/index', routes)
app.use('/commits', routes)

app.listen(3001)