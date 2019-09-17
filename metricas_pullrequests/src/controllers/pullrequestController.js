const request = require('request')

const urlBase = 'https://api.github.com'

exports.get = (req, res, next) => {
    if(req.query.owner === undefined || req.query.repository === undefined){
        res.status(400).send('Error 400: Bad Request')
    }else{
        let urlEndpoint = '/repos'
    urlEndpoint += '/' + req.query.owner
    urlEndpoint += '/' + req.query.repository + '/issues'

    request.get({ headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': '2019.2-Git-Breakdown'
    }, uri: urlBase+urlEndpoint }, function (error, response, body) {
            let issues = JSON.parse(body)
            console.log('error:', error)
            console.log('statusCode:', response && response.statusCode)
            function filterPR(issue) {
                if(issue.pull_request != undefined){
                    return true
                }
                return false
            }
            let filteredIssues = issues.filter(filterPR)
            
            res.status(response.statusCode).send(filteredIssues)
        })
    }
}

exports.post = (req, res, next) => {
    res.status(201).send('Requisição recebida com sucesso!')
}

exports.put = (req, res, next) => {
    let id = req.params.id
    res.status(201).send(`Requisição recebida com sucesso! ${id}`)
}

exports.delete = (req, res, next) => {
    let id = req.params.id
    res.status(200).send(`Requisição recebida com sucesso! ${id}`)
}