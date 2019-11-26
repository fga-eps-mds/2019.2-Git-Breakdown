const axios = require('axios')

const queryString = { state:'all', per_page: 10000 }

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
                'Accept': 'application/vnd.github.v3+json',
                'Accept-Charset': 'utf-8',
                'User-Agent': '2019.2-Git-Breakdown',
                'Authorization': `token ${token}`
            },
            params: queryString
        }
        
        await axios.get(url_endpoint, header_option).then( response => {
            let pullrequests = response.data
            
            function filterOpenPR(pr) {
                if(pr.state === 'open'){
                    return true
                }
                return false
            }
            let openPRs = pullrequests.filter(filterOpenPR)

            function filterClosedPR(pr) {
                if(pr.state === 'closed'){
                    return true
                }
                return false
            }
            let closedPRs = pullrequests.filter(filterClosedPR)

            function getRefusedMerge(pr) {
                if(pr.merged_at === null){
                    return true
                }
                return false
            }
            let refusedPullrequests = closedPRs.filter(getRefusedMerge)

            let numberOfOpen = Object.keys(openPRs).length
            let numberOfClosed = Object.keys(closedPRs).length 
            let numberOfRefused = Object.keys(refusedPullrequests).length
            let percentageOfRefused = (numberOfRefused/Object.keys(pullrequests).length)*100

            let total_merged = numberOfClosed - numberOfRefused

            let prInfo = {'open': numberOfOpen, 'closed': numberOfClosed, 'refused_percent': percentageOfRefused,
        'merged': total_merged, 'refused': numberOfRefused}
            
            res.status(200).json(prInfo)
        }).catch(function (err) {
                console.log(err)
        })
    }
}

exports.post = (req, res, next) => {
    res.status(201).send('Requisição recebida com sucesso!')
}

exports.put = (req, res, next) => {
    let id = req.params.id
    res.status(201).send(`Requisição recebida com sucesso! ${id}`)
}

exports.delete = (req, res, next) => {
    let id = req.params.id
    res.status(200).send(`Requisição recebida com sucesso! ${id}`)
}