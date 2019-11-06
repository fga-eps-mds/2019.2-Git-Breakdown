const express = require('express')
const axios = require('axios')
const infos_route = express.Router()
const queryString = { state:'all', per_page: 10000 }


infos_route.get = async (req, res, next) => {

    //verify if exist the necessary parms to send a get request
    const endpoint = 'users'
    const owner = req.query.owner
    profileInformation = []

    if (owner === undefined) {
        return res.status(400).send('Error 400: Bad Request')
    }
    else {
        //header params send to get request
        const gitApiUrl = 'https://api.github.com'
        const url_endpoint = `${gitApiUrl}/${endpoint}/${owner}`
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
                //infos hold a vector of json's data
                const profile = response.data
                let info = {'name': profile.nome, 'login': profile.login, 
                            'avatar': profile.avatar_url, 'bio': profile.bio,
                            'location': profile.location}
                return res.status(200).json(info)
            }).catch(function (err) {
                console.log(err)
            })
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

//export this functionality as a module
module.exports = infos_route
