const axios = require('axios')

const queryString = { state:'closed' }

exports.get = async (req, res, next) => 
{
    const owner = req.query.owner
    const repository = req.query.repository
    const token = req.query.token
    const endpoint = 'pulls'
    const endpointB = 'branches'
    
    if(owner === undefined || repository === undefined || token === undefined){
        res.status(400).send("Error 400")
    }
    else
    {
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
        
        await axios.get(url_endpoint, header_option).then( async response => {
                let pullrequests = response.data
                function getMergedBranches(pr) {
                    if(pr.merged_at === null){
                        return false
                    }
                    return true
                }
                let mergedBranches = pullrequests.filter(getMergedBranches)
                qtdMerged = Object.keys(mergedBranches).length
                

                const url_endpointB = `${gitApiUrl}/repos/${owner}/${repository}/${endpointB}`

                const header_optionB = {
                    headers: {
                        'Accept': 'application/json',
                        'Accept-Charset': 'utf-8',
                        'User-Agent': '2019.2-Git-Breakdown',
                        'Authorization': `token ${token}`
                    }
                }
            
                await axios.get(url_endpointB, header_optionB).then( response => {
                        let branches = response.data

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
            
                        res.status(200).json(branchInfo)
                    }).catch(function (err) {
                        console.log(err)
                })
            }).catch(function (err) {
                console.log(err)
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