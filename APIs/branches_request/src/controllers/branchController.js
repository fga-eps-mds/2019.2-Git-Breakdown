const request = require('request')
const axios = require('axios')
const constants = require('../constants')
const urlBase = 'https://api.github.com'

exports.get = (req, res, next) => 
{
    if (req.query.owner === undefined || req.query.repository === undefined)
    {
        res.status(400).send("Error 400")
    }
    else
    {
        request.get(
            { 
                    headers: 
                    {
                        'Accept': 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json',
                        'User-Agent': '2019.2-Git-Breakdown',
                    },
        
                    uri: urlBase + '/repos/' + req.query.owner + '/' + req.query.repository
                    + '/pulls?state=closed' 
            }, 
            function (error, response, body) 
            {
                let pullrequests = JSON.parse(body)
                function getMergedBranches(pr) {
                    if(pr.merged_at === null){
                        return false
                    }
                    return true
                }
                let mergedBranches = pullrequests.filter(getMergedBranches)
                qtdMerged = Object.keys(mergedBranches).length
                

                let urlEndpoint = '/repos'
                urlEndpoint += '/' + req.query.owner
                urlEndpoint += '/' + req.query.repository + '/branches'
            
                request.get(
                    { 
                        headers: 
                        {
                            'Accept': 'application/vnd.github.v3+json',
                            'Content-Type': 'application/json',
                            'User-Agent': '2019.2-Git-Breakdown',
                            'Authorization': constants.token
                        },
            
                        uri: urlBase + urlEndpoint 
                    }, 
                    function (error, response, body) 
                    {
                        let branches = JSON.parse(body)

                        function filterActiveBranches(br) {
                            if(br.name != 'master'){
                                return true
                            }
                            return false
                        }

                        let activeBranches = branches.filter(filterActiveBranches)
                        let qtdActive = Object.keys(activeBranches).length
            
                        let percentage_merged = parseFloat(((qtdMerged / (qtdActive+qtdMerged)) * 100).toFixed(2))
            
                        let branchInfo = {'active_branches': qtdActive, 
                            'percentage_merged': percentage_merged}
            
                        res.status(response.statusCode).json(branchInfo)
                    })
            })
    }

}

exports.post = (req, res, next) => 
{
    res.status(201).send('Requisição recebida com sucesso!')
}

exports.put = (req, res, next) => 
{
    let id = req.params.id
    res.status(201).send(`Requisição recebida com sucesso! ${id}`)
}

exports.delete = (req, res, next) => 
{
    let id = req.params.id
    res.status(200).send(`Requisição recebida com sucesso! ${id}`)
}