import constants from './constants.js'

const url = 
`https://github.com/login/oauth/authorize?response_type=code&client_id=${constants.CLIENT_ID}&scope=repo`

document.getElementById('loginButton').addEventListener("click", function() 
{
    window.open(url)
}, false)

document.getElementById('logoutButton').addEventListener("click", function()
{
    chrome.storage.sync.set({'oauth2_token': null}, function()
    {
        console.log("Token removido com sucesso")
    })
    window.close()
})

document.addEventListener('DOMContentLoaded', function() 
{
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