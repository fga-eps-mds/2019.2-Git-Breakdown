window.onhashchange = async function()
{

    let gbdButton = document.getElementById('gbdButton')
    if (gbdButton !== this.undefined)
    {
        zenhubOnClick() 
        if (window.location.href.includes('#breakdown/issues'))
        {
            try{
                document.getElementsByClassName('gbdContent')[0].innerHTML = issuesPage()
            }catch(err){
                console.log('GDB Erro: ', err)
            }
        }
        else if (window.location.href.includes('#breakdown/commits')){
            try {
                document.getElementsByClassName('gbdContent')[0].innerHTML = commitsPage()
                setTimeout(function()
                {
                    getMetrics(false, date_unix_time, 0, 7)
                }, 2000) 
                plotTop10Commiter()

            } catch(err) {
                console.log('GDB Erro: ', err)
            }
        }
        else if (window.location.href.includes('#breakdown/branches') ) {
            try{
                document.getElementsByClassName('gbdContent')[0].innerHTML = branchPage()
            }catch(err){
                console.log('GBD error:', err)
            }
        }
        else if ( window.location.href.includes('#breakdown/pr')) {
            try{
                   
                document.getElementsByClassName('gbdContent')[0].innerHTML = prPage()
                
            }catch(err){
                console.log('GBD error:', err)
            }
        }
        else if(window.location.href.includes('#breakdown/Profile')){
            try{
               
                let url = window.location.hash
                url = url.split('=')
                await getProfile(url[1]) //profilePage.js
                setTimeout(function(){
                    let userContribution = plotPercentGraphics(url[1]) //metricsCalc.js
                    for(var key in userContribution){
                        displayTableInfo(userContribution[key], key) //metricsCalc.js
                    }
                    
                }, 2000) 
            }catch(err){
                console.log('GBD error:', err)
            }
        }
        else if (window.location.href.includes('#breakdown'))
        {
            let screen = document.getElementById('gbdScreen')
            if (screen == null)
                try{
                    chrome.storage.sync.get('oauth2_token', (res)=>{
                        if(res.oauth2_token != undefined){
                            selectBehavior()
                            initScreen()
                        }else{
                            selectBehavior()
                            placeContainer(loginPage())
                            login()
                        }
                    })

                }catch(err){
                    console.log('GBD error:', err)
                }
        }
        else
        {
            if (gbdButton.className == 'js-selected-navigation-item gbdselected reponav-item')
            {
                gbdButton.classList.remove('gbdselected')
            }
        }
    }
}

window.onload = ()=>{
    if (window.location.href.includes('#breakdown'))
    {
        try{
            chrome.storage.sync.get('oauth2_token', (res)=>{
                if(res.oauth2_token != undefined){
                    selectBehavior()
                    initScreen()
                }else{
                    selectBehavior()
                    placeContainer(loginPage())
                    login()
                }
            })

        }catch(err){
            console.log('GBD error:', err)
        }
    } 
}