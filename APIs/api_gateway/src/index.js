let http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const helmet = require('helmet');

const commitsServiceProxy = httpProxy('commit_api:3001');
const issuesServiceProxy = httpProxy('issue_api:3002');
const pullrequestsServiceProxy = httpProxy('pullrequest_api:3003');
const branchesServiceProxy = httpProxy('branch_api:3004');

// Proxy request
app.get('/commits', (req, res, next) => {
  commitsServiceProxy(req, res, next);
})

app.get('/issues', (req, res, next) => {
  issuesServiceProxy(req, res, next);
})

app.get('/pullrequests', (req, res, next) => {
  pullrequestsServiceProxy(req, res, next);
})

app.get('/branches', (req, res, next) => {
  branchesServiceProxy(req, res, next);
})

app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let server = http.createServer(app);
server.listen(3000);

module.exports = app