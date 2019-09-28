const request = require('request')
const express = require('express')
const commit_route = express.Router()

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
            url: url_endpoint,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'User-Agent': '2019.2-Git-Breakdown',
            }
        }

        try {
            await request.get(header_option, async (err, response, body) => {
                if (err)
                    throw err
                else {
                    //commits hold a vector of json's data
                    const commits = JSON.parse(body)
                    await commits.forEach((commit, index, array) => {
                        request.get({
                            headers: {
                                'Accept': 'application/json',
                                'Accept-Charset': 'utf-8',
                                'User-Agent': '2019.2-Git-Breakdown',
                                'Authorization': `token ${req.query.token}`
                            },
                            uri: commit.url
                        }, function (error, response, body) {
                            if (error)
                                throw error
                            else {
                                let singleCommit = JSON.parse(body)
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
                                if (contributorsInformation[0].commits === array.length){
                                    return res.status(200).json(contributorsInformation)
                                }
                            }
                        })
                    })
                }
            })
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

//export this functionality has a module
module.exports = commit_route
