const CLIENT_ID = '75c7ceaa2fd180fdceb3'
const CLIENT_SECRET = 'f70bab3c05d93de9a682de4e6874ca3a2ba680e0'

const getLoginUrl = (code) =>
    `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`

const saveAcessToken = (token) => 
{
    chrome.storage.sync.set({'oauth2_token': token.access_token}, function() 
    {
        console.log('Token saved')
    })
}

const getAccessToken = (code) => 
{
    fetch(getLoginUrl(code), 
    {
        method: 'POST',
        headers: 
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        },
    })
        .then(response => response.json())
        .then(obj => saveAcessToken(obj))
        .catch(error=>console.error(error))
}

const init = () => 
{
    if(location.search.match(/\?code=([\w\/\-]+)/))
    {
        let code = location.search.match(/\?code=([\w\/\-]+)/)[1]
        alert(code)
        getAccessToken(code)
    }
}

init()