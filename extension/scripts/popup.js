import constants from './constants.js'

const url = 
`https://github.com/login/oauth/authorize?response_type=code&client_id=${constants.CLIENT_ID}&scope=repo`

document.addEventListener('DOMContentLoaded', function() 
{
    let button = document.getElementById("loginButton")
    button.addEventListener("click", function() 
    {
        chrome.tabs.create({url: url})
    }, false)
})

chrome.storage.sync.get('oauth2_token', function(res) 
{
    console.log('Token: ', res.oauth2_token)
    if (res.oauth2_token != undefined)
    {
        alert("Token salvado com sucesso: " + res.oauth2_token)
        let loginButton = document.getElementById('loginButton')
        loginButton.parentNode.removeChild(loginButton)
    }
});