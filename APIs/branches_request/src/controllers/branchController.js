const request = require('request')

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
        urlEndpoint += '/' + req.query.repo + '/branches'
        request.get(
        { 
            headers: 
            {
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
                'User-Agent': '2019.2-Git-Breakdown',
                'Authorization': 'b3bdda9d8bdadd006a8d4279cff79156a3757906'
            },
            uri: urlBase+urlEndpoint 
        }, 
        function (error, response, body) 
        {
            let issues = body
            res.status(response.statusCode).send(issues)
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