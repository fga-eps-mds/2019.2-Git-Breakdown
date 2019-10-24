const axios = require('axios')

const queryString = { state:'all' }

exports.get = async (req, res, next) => {
    const owner = req.query.owner
    const repository = req.query.repository
    const token = req.query.token
    const endpoint = 'pulls'
    contributorsInformation = [{ 'pullrequests': 0 }]
    
    if(owner === undefined || repository === undefined || token === undefined){
        res.status(400).send('Error 400: Bad Request')
    }else{
        const gitApiUrl = 'https://api.github.com'
        const url_endpoint = `${gitApiUrl}/repos/${owner}/${repository}/${endpoint}`

        const header_option = {
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'User-Agent': '2019.2-Git-Breakdown',
                'Authorization': `token ${token}`
            },
            params: queryString
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
            
            await filteredPullRequests.forEach((pr, index, array) => {

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
                    contributorsInformation[0].pullrequests += 1

                    if (contributorsInformation[0].pullrequests === array.length) {
                        return res.status(200).json(contributorsInformation)
                    }
                })
        }).catch(function (err) {
                console.log(err)
        })
    }
}