const axios = require('axios')
const queryString = { per_page: 10000 }


exports.get = async (req, res, next) => {
    const owner = req.query.owner
    const token = req.query.token
    const endpoint = 'repos'
    statusResponse = []


    if (owner === undefined || token === undefined) {
        res.status(400).send('Error 400: Bad Request')
    } else {
        const gitApiUrl = 'https://api.github.com'
        const url_endpoint = `${gitApiUrl}/orgs/${owner}/${endpoint}`

        const header_option = {
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8',
                'User-Agent': '2019.2-Git-Breakdown',
                'Authorization': `token ${token}`
            },
            params: queryString
        }

        await axios.get(url_endpoint, header_option).then( async response => {
            let organization = response.data
            
            await organization.forEach(async repo => {
                let repoName = repo.name 
                const url_endpoint2 = `${gitApiUrl}/${endpoint}/${owner}/${repoName}/statuses/master`  
                
                await axios.get(url_endpoint2, header_option).then( async response => {
                    infosRepo = response.data
                    let state = 'undefined'
                    if(infosRepo[0] != undefined){
                        state = infosRepo[0].state
                    }
                    let statusRepo = { 'name': repoName, 'status': state }
                    statusResponse.push(statusRepo)
                    if(organization.length == statusResponse.length){
                        res.status(200).json(statusResponse)
                    }
                }).catch(function (err) {
                    console.log(err)
                })
            })            
        }).catch(function (err) {
            console.log(err)
        })
    }
}
