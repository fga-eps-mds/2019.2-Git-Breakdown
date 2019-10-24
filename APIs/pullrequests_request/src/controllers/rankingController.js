const axios = require('axios')

const queryString = { state:'all' }

exports.get = async (req, res, next) => {
    const owner = req.query.owner
    const repository = req.query.repository
    const token = req.query.token
    const endpoint = 'pulls'
    
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
        
        await axios.get(url_endpoint, header_option).then( response => {
            let pullrequests = response.data
            
            res.status(200).json(pullrequests)
        }).catch(function (err) {
                console.log(err)
        })
    }
}