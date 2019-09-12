const request = require('request')

const urlBase = 'https://api.github.com'
const urlEndpoint = '/repos/fga-eps-mds/2019.2-Git-Breakdown/issues'

exports.get = (req, res, next) => {
    request.get({ headers: {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': '2019.2-Git-Breakdown'
    },
    uri: urlBase+urlEndpoint }, function (error, response, body) {
        let issues = body;
        console.log('error:', error)
        console.log('statusCode:', response && response.statusCode)
        res.status(200).send(issues)
    });
    
}

exports.post = (req, res, next) => {
    res.status(201).send('Requisição recebida com sucesso!');
};
exports.put = (req, res, next) => {
    let id = req.params.id
    res.status(201).send(`Requisição recebida com sucesso! ${id}`)
};
exports.delete = (req, res, next) => {
    let id = req.params.id
    res.status(200).send(`Requisição recebida com sucesso! ${id}`)
};