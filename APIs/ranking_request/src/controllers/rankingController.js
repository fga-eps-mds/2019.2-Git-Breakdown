const axios = require('axios')

const urlCommits = 'http://localhost:3001/commits'
const urlIssues = 'http://localhost:3002/issues'
const urlPullrequests = 'http://localhost:3003/pullrequests'
const urlBranches = 'http://localhost:3004/branches'

exports.get = async (req, res, next) => {
    const owner = req.query.owner
    const repository = req.query.repository
    const token = req.query.token
    
    if(owner === undefined || repository === undefined || token === undefined){
        res.status(400).send('Error 400: Bad Request')
    }else{
        const urlParams = `?owner=${owner}&repository=${repository}&token=${token}`
        
        await axios.get(urlCommits+urlParams).then( response => {
            const commitsRanking = response.data
            console.log(commitsRanking)
        }).catch(function (err) {
                console.log(err)
        })
        
        res.status(200)
    }
}