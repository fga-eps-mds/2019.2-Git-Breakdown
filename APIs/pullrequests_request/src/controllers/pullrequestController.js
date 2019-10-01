const request = require('request')

const urlBase = 'https://api.github.com'

exports.get = (req, res, next) => {
    if(req.query.owner === undefined || req.query.repository === undefined){
        res.status(400).send('Error 400: Bad Request')
    }else{
        let urlEndpoint = '/repos'
        urlEndpoint += '/' + req.query.owner
        urlEndpoint += '/' + req.query.repository + '/pulls?state=all' 

        request.get({ headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'User-Agent': '2019.2-Git-Breakdown'
        }, uri: urlBase+urlEndpoint }, function (error, response, body) {
            let pullrequests = JSON.parse(body)
            
            function filterOpenPR(pr) {
                if(pr.state === 'open'){
                    return true
                }
                return false
            }
            let openPRs = pullrequests.filter(filterOpenPR)

            function filterClosedPR(pr) {
                if(pr.state === 'closed'){
                    return true
                }
                return false
            }
            let closedPRs = pullrequests.filter(filterClosedPR)

            let numberOfOpen = Object.keys(openPRs).length
            let numberOfClosed = Object.keys(closedPRs).length 

            let prInfo = {'open': numberOfOpen, 'closed': numberOfClosed}
            
            res.status(response.statusCode).json(prInfo)
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