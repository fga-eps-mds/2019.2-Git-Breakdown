window.onhashchange = function()
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

                getProfile(url[1])

                setTimeout(function(){
                    let percentCommits = calcPercentCommits(commitsData , url[1])
                    let percentCommitsGraphics = document.getElementById('percentCommits').getContext('2d')
                    createPercentCommits(percentCommits, percentCommitsGraphics, url[1])
                },2000)
               

                // calcPercentOpenedIssues(rankingData, url[1])
                // //calcPercentClosedIssues(rankingData, url[1])
                // calcPercentMergedPullRequest(rankingData, url[1])

               
               

            }catch(err){
                console.log('GBD error:', err)
            }
        }
        else if (window.location.href.includes('#breakdown'))
        {
            let screen = document.getElementById('gbdScreen')
            if (screen == null)
                try{

                   

                    selectBehavior()
                    initScreen()
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