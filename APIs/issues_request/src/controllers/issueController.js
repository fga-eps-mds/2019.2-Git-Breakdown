const axios = require('axios')

const queryString = { state:'all', per_page: 100 }

async function requisition (link, token){
    let issuesJson = {}
    const header_option = {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Accept-Charset': 'utf-8',
            'User-Agent': '2019.2-Git-Breakdown',
            'Authorization': `token ${token}`
        },
        params: queryString
    } 

    await axios.get(link, header_option).then( response => {
        let issues = response.data
        let link = response.headers.link.split(',')

        return issues
    }).then(issues => {
        let filteredIssues = issues.filter(filterIssues)
        let openIssues = filteredIssues.filter(getOpenIssues)
        let closedIssues = filteredIssues.filter(getClosedIssues)
        let tIssues = Object.keys(filteredIssues).length //number of all issues

        let oIssues = Object.keys(openIssues).length //number of open issues
        let cIssues = Object.keys(closedIssues).length //number of closed issues
        let percentOfOpen = parseFloat(((oIssues/tIssues)*100).toFixed(2))
        let percentOfClosed = parseFloat(((cIssues/tIssues)*100).toFixed(2))

        let issuesInformation = {'open': oIssues, 'closed': cIssues, 'openPercent': percentOfOpen, 'closedPercent': percentOfClosed}
        
        issuesJson = issuesInformation
        return issuesJson
    }).catch(function (err) {
        console.log(err)
    })
    return issuesJson
}

exports.get = async (req, res, next) => {
    const owner = req.query.owner
    const repository = req.query.repository
    const token = req.query.token
    const endpoint = 'issues'
    
    if(owner === undefined || repository === undefined || token === undefined){
        return res.status(400).send('Error 400: Bad Request')
    }else{
        const gitApiUrl = 'https://api.github.com'
        const url_endpoint = `${gitApiUrl}/repos/${owner}/${repository}/${endpoint}`
        
        let json = await requisition(url_endpoint, token)
        
        return res.status(200).json(json)
    }
}

function filterIssues(issue) {
    if(issue.pull_request === undefined){
        return true
    }
    return false
}

function getOpenIssues(filteredIssues) {
    if(filteredIssues.state === 'open'){
        return true
    }
    return false
}

function getClosedIssues(filteredIssues) {
    if(filteredIssues.state === 'closed'){
        return true
    }
    return false
}