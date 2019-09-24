const request = require('request')
const express = require('express')
const commit_route = express.Router()

commit_route.get = (req , res, err) => {

    //verify if exist the necessary parms to to sent a get request
    const owner = req.query.owner
    const repo = req.query.repo
    const endpoint = 'commits'

    console.log('owner:', owner)
    console.log('repo:', repo)

    if(owner === undefined || req.query.repo === undefined){
        res.status(400).send('Error 400: Bad Request')
    }
    else{
        //header params send to get request
        const gitApiUrl = 'https://api.github.com'
        const url_endpoint = `${gitApiUrl}/repos/${owner}/${repo}/${endpoint}`
        const header_option = {
            url: url_endpoint,
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'User-Agent': '2019.2-Git-Breakdown',  
            }
        }

        request.get(header_option, (err, response , body)=>{

            //console.log('StatusCode:' , res.statusCode)
            if(!err)
                console.log('Error:' , err) //print an error if any occur   
            
        
            //commits hold a vector of json's data
            const commits = JSON.parse(body)
            res.status(response.statusCode).send(commits)
        })
    }
}

//export this functionality has a module
module.exports = commit_route
