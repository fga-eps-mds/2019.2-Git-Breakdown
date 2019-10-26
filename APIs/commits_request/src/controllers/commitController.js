const express = require('express')
const axios = require('axios')
const commit_route = express.Router()
const queryString = { state:'all', per_page: 10000 }


commit_route.get = async (req, res, next) => {

    //verify if exist the necessary parms to send a get request
    const owner = req.query.owner
    const repository = req.query.repository
    const endpoint = 'commits'
    contributorsInformation = [{ 'commits': 0 }]

    if (owner === undefined || req.query.repository === undefined || req.query.token === undefined) {
        return res.status(400).send('Error 400: Bad Request')
    }
    else {
        //header params send to get request
        const gitApiUrl = 'https://api.github.com'
        const url_endpoint = `${gitApiUrl}/repos/${owner}/${repository}/${endpoint}`
        const header_option = {
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'User-Agent': '2019.2-Git-Breakdown',
                'Authorization': `token ${req.query.token}`
            },
            params: queryString
        }

        try {
            await axios.get(url_endpoint, header_option).then(async (response) => {
                //commits hold a vector of json's data
                const commits = response.data
                await commits.forEach((commit, index, array) => {
                    axios.get(commit.url, header_option).then(function (response) {
                        let singleCommit = response.data
                        let match = false
                        for (let contributor in contributorsInformation) {
                            if (contributorsInformation[contributor].name === singleCommit.author.login) {
                                contributorsInformation[contributor].commits += 1
                                contributorsInformation[contributor].additions += singleCommit.stats.additions
                                contributorsInformation[contributor].deletions += singleCommit.stats.deletions
                                match = true
                                contributorsInformation[0].commits += 1
                            }
                        }
                        if (match === false) {
                            let committer = { 'name': singleCommit.author.login, 'commits': 1, 'additions': singleCommit.stats.additions, 'deletions': singleCommit.stats.deletions }
                            contributorsInformation.push(committer)
                            contributorsInformation[0].commits += 1
                        }
                        if (contributorsInformation[0].commits === array.length) {
                            return res.status(200).json(contributorsInformation)
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                })
            }).catch(function (err) {
                console.log(err)
            })
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

//export this functionality as a module
module.exports = commit_route
