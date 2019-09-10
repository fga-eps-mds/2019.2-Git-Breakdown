const express = require('express');
const app = express();
const request = require('request');
const routes = require('./routes');


app.use('/', routes);
app.use('/index', routes);


app.listen(8888);