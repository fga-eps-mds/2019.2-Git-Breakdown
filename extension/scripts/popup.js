import constants from './constants.js'

const url = 
`https://github.com/login/oauth/authorize?response_type=code&client_id=${constants.CLIENT_ID}&scope=repo`

document.getElementById('loginButton').addEventListener("click", function() 
{
    window.open(url)
}, false)

document.getElementById('logoutButton').addEventListener("click", function()
{
    let exit = confirm("Are you sure to logout?")
    if (exit)
    {
        chrome.storage.sync.set({'oauth2_token': null}, function()
        {
            console.log("Token removido com sucesso")
        })
        window.close()
    }
})

document.getElementById('gitpages').addEventListener("click", function()
{
    window.open('https://fga-eps-mds.github.io/2019.2-Git-Breakdown/#/')
},false)

document.addEventListener('DOMContentLoaded', function() 
{
    chrome.tabs.query
    ({
        'active': true, 'lastFocusedWindow': true
    },
    function (tabs) 
    {
        
        let array = tabs[0].url.split("/")

        if (array[3] !== undefined && array[4] !== undefined)
        {
            constants.OWNER_KEY = array[3]
            constants.REPO_KEY = array[4].split("#")[0]
        
            chrome.storage.sync.get('oauth2_token', function(res) 
            {
                if (res.oauth2_token != undefined)
                {
                    let url_aux = `?owner=${constants.OWNER_KEY}&repository=${constants.REPO_KEY}&token=${res.oauth2_token}`
                    if (constants.OWNER_KEY === undefined || constants.REPO_KEY === undefined)
                    {
                        console.log("Not in a valid repository")
                    }
                    else
                    {
                        /*createIssuesChart(url_aux, constants.REPO_KEY)
                        createPRChart(url_aux, constants.REPO_KEY)
                        createBranchesChart(url_aux, constants.REPO_KEY)
                        createCommitsChart(url_aux, constants.REPO_KEY)*/
                    }
                }
                else
                {
                    console.log("Token nao disponivel")
                }
            })
        }
    })
})

chrome.storage.sync.get('oauth2_token', function(res) 
{
    if (res.oauth2_token != undefined)
    {
        console.log("Token salvo: " + res.oauth2_token)
        let loginButton = document.getElementById('loginButton')
        loginButton.parentNode.removeChild(loginButton)
    }
    else
    {
        console.log("Token nao disponivel")
        let logoutButton = document.getElementById('logoutButton')
        logoutButton.parentNode.removeChild(logoutButton)
    }
})