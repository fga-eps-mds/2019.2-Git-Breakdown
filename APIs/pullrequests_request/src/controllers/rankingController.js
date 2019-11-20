const axios = require('axios')
const http = require('http');
const agent = new http.Agent({ family: 4 });

const queryString = { state:'all', per_page: 10000 }

exports.get = async (req, res, next) => {
    const owner = req.query.owner
    const repository = req.query.repository
    const token = req.query.token
    const endpoint = 'pulls'
    contributorsInformation = []
    
    if(owner === undefined || repository === undefined || token === undefined){
        res.status(400).send('Error 400: Bad Request')
    }else{
        const gitApiUrl = 'https://api.github.com'
        const url_endpoint = `${gitApiUrl}/repos/${owner}/${repository}/${endpoint}`

        const header_option = {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Accept-Charset': 'utf-8',
                'User-Agent': '2019.2-Git-Breakdown',
                'Authorization': `token ${token}`
            },
            params: queryString,
            httpAgent: agent
        }
        
        await axios.get(url_endpoint, header_option).then(async response => {
            let pullrequests = response.data
            
            function filterPullRequests(pullrequest){
                if(pullrequest.state === 'closed' && pullrequest.merged_at != undefined){
                    return true
                }
                return false
            }
            let filteredPullRequests = pullrequests.filter(filterPullRequests)
            
            await filteredPullRequests.forEach(async (pr, index, array) => {

                let match = false
                for (let contributor in contributorsInformation) {
                    if (contributorsInformation[contributor].name === pr.user.login) {
                        contributorsInformation[contributor].merged_pull_requests += 1
                        match = true
                    }
                }
                if (match === false) {
                    let committer = { 'name': pr.user.login,
                                      'merged_pull_requests': 1, 
                                      'comments': 0 }
                    contributorsInformation.push(committer)
                }
                
                await axios.get(pr.comments_url, header_option).then(async response => {
                    let comments = response.data

                    await comments.forEach((comment, index, arr) => {
                        let match = false
                        for (let contributor in contributorsInformation) {
                            if (contributorsInformation[contributor].name === comment.user.login) {
                                contributorsInformation[contributor].comments += 1
                                match = true
                            }
                        }
                        if (match === false) {
                            let committer = { 'name': comment.user.login,
                                              'merged_pull_requests': 0,
                                              'comments': 1 }
                            contributorsInformation.push(committer)
                        }
                    })
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