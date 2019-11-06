const express = require('express')
const app = express()
const routes = require('../src/routes/profileRoute')


app.use('/', routes)
app.use('/profile', routes)

app.listen(3006)