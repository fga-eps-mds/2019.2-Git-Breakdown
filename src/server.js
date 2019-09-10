const express = require('express');
const app = express();
const routes = require('./routes');


app.use('/', routes);
app.use('/index', routes);


app.listen(8888);