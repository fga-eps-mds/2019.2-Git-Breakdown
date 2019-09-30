const request = require('request')
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
            res.status(response.statusCode).json(branches)
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