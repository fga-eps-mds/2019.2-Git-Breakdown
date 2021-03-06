const axios = require('axios')

const queryString = { state:'all', per_page: 10000 }
const queryString2 = { state:'all', per_page: 10000 }
const endpoint = 'issues'

exports.get = async (req, res, next) => {
    const owner = req.query.owner
    const repository = req.query.repository
    const token = req.query.token
    
    contributorsInformation = []

    if(owner === undefined || repository === undefined || token === undefined){
        res.status(400).send('Error 400: Bad Request')
    }else{
        const gitApiUrl = 'http://api.github.com'
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
                'Accept': 'application/vnd.github.v3+json',
                'Accept-Charset': 'utf-8',
                'User-Agent': '2019.2-Git-Breakdown',
                'Authorization': `token ${token}`
            },
            params: queryString
        }    

    await axios.get(url_endpoint, header_option).then(async response => {
            let issues = response.data
            let filteredIssues = issues.filter(filterIssues)
            const header_option_2 = {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Accept-Charset': 'utf-8',
                    'User-Agent': '2019.2-Git-Breakdown',
                    'Authorization': `token ${token}`
                },
                params: queryString2
            }

            await filteredIssues.forEach(async (issue, index, array) => {

                let match = false
                for (let contributor in contributorsInformation) {
                    if (contributorsInformation[contributor].name === issue.user.login) {
                        contributorsInformation[contributor].opened_issues += 1
                        match = true
                    }
                }
                if (match === false) {
                    let committer = { 'name': issue.user.login,
                                        'opened_issues': 1,
                                        'closed_issues': 0, 
                                        'comments': 0 }
                    contributorsInformation.push(committer)
                }
                
                await axios.get(issue.url, header_option_2).then(function (response) {
                    let issue = response.data
                    if(issue.closed_by != undefined){
                        let match = false
                        for (let contributor in contributorsInformation) {
                            if (contributorsInformation[contributor].name === issue.closed_by.login) {
                                contributorsInformation[contributor].closed_issues += 1
                                match = true
                            }
                        }
                        if (match === false) {
                            let committer = { 'name': issue.closed_by.login,
                                                'opened_issues': 0,
                                                'closed_issues': 1, 
                                                'comments': 0 }
                            contributorsInformation.push(committer)
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
                
                await axios.get(issue.comments_url, header_option_2).then(function (response) {
                    let comments = response.data

                    comments.forEach((comment, index, array) => {
                        let match = false
                        for (let contributor in contributorsInformation) {
                            if (contributorsInformation[contributor].name === comment.user.login) {
                                contributorsInformation[contributor].comments += 1
                                match = true
                            }
                        }
                        if (match === false) {
                            let committer = { 'name': comment.user.login,
                                              'opened_issues': 0,
                                              'closed_issues': 0, 
                                              'comments': 1 }
                            contributorsInformation.push(committer)
                        }
                    }) 
                    contributorsInformation[0].issues += 1
                    if (contributorsInformation[0].issues === array.length) {
                        
                    }
                }).catch(err => {
                    console.log(err)
                })
            })
            return res.status(200).json(contributorsInformation)
        }).catch(function (err) {
                console.log(err)
        })
    }
}

function filterIssues(issue) {
    if(issue.pull_request === undefined){
        return true
    }
    return false
}