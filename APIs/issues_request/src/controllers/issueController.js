const axios = require('axios')

const urlBase = 'https://api.github.com'

let queryString = { state:'all', per_page: '10000' }

exports.get = async (req, res, next) => {
    const owner = req.query.owner
    const repository = req.query.repository
    const endpoint = 'issues'
    
    if(req.query.owner === undefined || req.query.repository === undefined || req.query.token === undefined){
        res.status(400).send('Error 400: Bad Request')
    }else{
        const gitApiUrl = 'https://api.github.com'
        const url_endpoint = `${gitApiUrl}/repos/${owner}/${repository}/${endpoint}`
        
    if(req.query.date != undefined){    
        let date = new Date()
        let selectedDate = req.query.date.split('-') //date first format: DD-MM-YYYY
        let day = selectedDate[0]
        let month = selectedDate[1]
        let year = selectedDate[2]
        let hour = 0
        date.setFullYear(year, month -1, day)
        date.setHours(hour - 3, 0, 0, 0)
        queryString.since = date
    }
    
    const header_option = {
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'User-Agent': '2019.2-Git-Breakdown',
                'Authorization': `token ${req.query.token}`
            },
            params: queryString
        }    

    await axios.get(url_endpoint, header_option).then((response) => {
            let issues = response.data
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

            let tIssues = Object.keys(filteredIssues).length //number of all issues
            let oIssues = Object.keys(openIssues).length //number of open issues
            let cIssues = Object.keys(closedIssues).length //number of closed issues
            let percentOfOpen = parseFloat(((oIssues/tIssues)*100).toFixed(2))
            let percentOfClosed = parseFloat(((cIssues/tIssues)*100).toFixed(2))

            let issuesInformation = {'open': oIssues, 'closed': cIssues, 'openPercent': percentOfOpen, 'closedPercent': percentOfClosed}
            res.status(200).json(issuesInformation)
        }).catch(function (err) {
                console.log(err)
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