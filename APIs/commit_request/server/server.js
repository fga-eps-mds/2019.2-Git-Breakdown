const express = require('express')
const app = express()
const routes = require('../routes/routes')


app.use('/', routes)
app.use('/index', routes)
app.use('/commits', routes)

app.listen(8888)