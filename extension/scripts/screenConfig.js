let url_base = 'http://18.215.242.203:3000'

let issuesData , branchsData, prData, commitsData, rankingData

let weights = [4,5,3,2] // default weights

let sprintLength = 7 // default sprint size

function getMetrics() 
{
    chrome.runtime.sendMessage({metric: weights}, function(response) 
    {
        console.log(weights)
        if (response !== undefined)
        {
            commitsData = response[0]
            issuesData = response[1]
            branchsData = response[2]
            prData = response[3]
            rankingData = response[4]
        }
    })
}

const METRICS = 
[
  'commitsDashboard', // 0 
  'issuesDashboard', // 1
  'branchesDashboard', // 2
  'prsDashboard', // 3
  'ranking' // 4
]

const homeBtn = () => {
    let homeBtn = document.getElementById('gbdHomeBtn')
    homeBtn.addEventListener('click', () => {
        try{
            document.getElementsByClassName('gbdContent')[0].innerHTML = initScreen()
        }catch(err) {
            console.log("GBD error:", err)
        }
     })
 }

const initScreen = () => 
{   
    
    //function to control the select behavior in buttons inside navbar
    zhplugin()
    selectBehavior()

    
    //Catching the container 
    try{
        let mainContainer = document.getElementsByTagName('div')
        let containgerPattern = /.*(container-lg clearfix new-discussion-timeline experiment-repo-nav)+.*/ 
        for(let i = 0 ; i < mainContainer.length ; i++){
            let className = mainContainer[i].className
            let answer = containgerPattern.exec(className)
            if (answer != null){
                mainContainer[i].innerHTML = gbdScreen()
                mainContainer[i].style.maxWidth = "100%"
                break;
            }
                 
        }
        homeBtn()
    }catch(err) {
        console.log('GBD Error:', err)
    }
    
    try{
        if (typeof chrome.app.isInstalled !== 'undefined'){
            chrome.runtime.sendMessage({metric: weights}, function(response) {
                if (response !== undefined){
                    console.log("good response")
                    commitsData = response[0]
                    issuesData = response[1]
                    branchsData = response[2]
                    prData = response[3]
                    rankingData = response[4]
                    
                    try{
                        let issuesCtx = document.getElementById('issuesDashboard').getContext('2d')
                        createIssuesChart(issuesData, issuesCtx)
                        
                        let commitCtx = document.getElementById('commitsDashboard').getContext('2d')
                        createCommitsChart(commitsData, commitCtx)

                        let branchesCtx = document.getElementById('branchesDashboard').getContext('2d')
                        createBranchesChart(branchsData, branchesCtx)

                        let prCtx = document.getElementById('prsDashboard').getContext('2d')
                        createPRChart(prData, prCtx)
                                        
                        for (let i = 0; i < 4; i++)
                            chartOnClick(i, response[i])
                    }catch(err){
                        console.log("GBD error:", err)
                    }
                }else
                    console.log("undefined response")
            })
        }
        else
            console.log("undefined chrome app")
        
    }catch(err) {
        console.log("GBD error:", err)
    }

    settingsOnClick()

}

// triggers when save button from configuration page is clicked
$(document).on("click", "#settingsSave", function() 
{
    sprintLength = $('#sprintLength').val()
    weights[0] = $('#mergedWeight').val()
    weights[1] = $('#commitsWeight').val()
    weights[2] = $('#openWeight').val()
    weights[3] = $('#commentsWeight').val()
    alert("Configurations saved!")
})

window.onhashchange = function()
{
    console.log("changed")
    let gbdButton = document.getElementById('gbdButton')
    if (gbdButton !== this.undefined)
    {
        zenhubOnClick() 
        if (window.location.href.includes("#breakdown/issues"))
        {
            try{
                
                document.getElementsByClassName('gbdContent')[0].innerHTML = issuesPage()
            }catch(err){
                console.log("GDB Erro: ", err)
            }
        }
        else if (window.location.href.includes("#breakdown/commits")){
            try {
                   
                document.getElementsByClassName('gbdContent')[0].innerHTML = commitsPage()
                plotTop10Commiter()

            } catch(err) {
                console.log("GDB Erro: ", err)
            }
        }
        else if (window.location.href.includes("#breakdown/branches") ) {
            try{
                document.getElementsByClassName('gbdContent')[0].innerHTML = branchPage()
            }catch(err){
                console.log("GBD error:", err)
            }
        }
        else if ( window.location.href.includes("#breakdown/pr")) {
            try{
                   
                document.getElementsByClassName('gbdContent')[0].innerHTML = prPage()
                
            }catch(err){
                console.log("GBD error:", err)
            }
            
        }
        else if (window.location.href.includes("#breakdown"))
        {
            let screen = document.getElementById('gbdScreen')
            if (screen == null)
                try{
                    selectBehavior()
                    initScreen()
                }catch(err){
                    console.log("GBD error:", err)
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

const chartOnClick = (type, data) =>
{
    const chart = document.getElementById(METRICS[type])
    if (chart !== undefined && chart != null)
    {
        chart.addEventListener('click', function()
        {
            let screen = document.getElementById('gbdScreen')
            if (screen != null)
            {
                console.log(METRICS[type].split("Dashboard")[0])
                window.location.hash = `#breakdown/${METRICS[type].split("Dashboard")[0]}`
            }
        })
    }
}

const gbdButtonOnClick = () =>{
    const gbdtab = document.getElementById('gbdButton')
    if (gbdtab !== null){
        gbdtab.addEventListener('click', function(){
            let screen = document.getElementById('gbdScreen')
            if (screen == null && window.location.href.includes("#breakdown"))
                initScreen()
                selectBehavior()
                zenhubOnClick()  
        })
    }
}

try{
    getMetrics()
    gbdButtonOnClick()
}catch(err){
    console.log("GBD error:", err)
}


