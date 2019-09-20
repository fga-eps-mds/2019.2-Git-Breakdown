const request = require('request')

const urlBase = 'https://api.github.com'

let queryString = { state:'all', per_page: '10000', since: '' }

exports.get = (req, res, next) => {
    if(req.query.owner === undefined || req.query.repository === undefined){
        res.status(400).send('Error 400: Bad Request')
    }else{
        let urlEndpoint = '/repos'
    urlEndpoint += '/' + req.query.owner
    urlEndpoint += '/' + req.query.repository + '/issues'

    let date = new Date()
    date.setFullYear(2019, 7, 19)
    date.setHours(-3, 0, 0, 0)
    console.log(date)
    queryString.since = date
    console.log(queryString.since)
    

    request.get({ headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': '2019.2-Git-Breakdown'
    }, uri: urlBase+urlEndpoint, qs: queryString }, function (error, response, body) {
            let issues = JSON.parse(body)
            console.log('error:', error)
            console.log('statusCode:', response && response.statusCode)
            function filterIssues(issue) {
                if(issue.pull_request === undefined){
                    return true
                }
                return false
            }
            let filteredIssues = issues.filter(filterIssues)

            function getOpenIssues(filteredIssues) {
                if(filteredIssues.state === 'open'){
                    return true
                }
                return false
            }
            let openIssues = filteredIssues.filter(getOpenIssues)

            function getClosedIssues(filteredIssues) {
                if(filteredIssues.state === 'closed'){
                    return true
                }
                return false
            }
            let closedIssues = filteredIssues.filter(getClosedIssues)

            console.log( Object.keys(filteredIssues).length )
            console.log( Object.keys(openIssues).length )
            console.log( Object.keys(closedIssues).length )
            
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