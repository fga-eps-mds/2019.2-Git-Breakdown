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

document.addEventListener('DOMContentLoaded', function() 
{
    chrome.tabs.query
    ({
        'active': true, 'lastFocusedWindow': true
    },
    function (tabs) 
    {
        constants.PAGE_URL = tabs[0].url
        console.log("page url: " + constants.PAGE_URL)
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
        
        /*
        Aqui a gente remove o gráfico de issues quando da logout
        TODO: depois de finalizar a issue de criar gráfico de commits, 
        tem que arrumar isso para só mostrar um gráfico de cada vez a partir
        da aba selecionada algo do tipo
        */
        let issue_graph = document.getElementById('issueStatusChart')
        issue_graph.parentNode.removeChild(issue_graph)
    }
})