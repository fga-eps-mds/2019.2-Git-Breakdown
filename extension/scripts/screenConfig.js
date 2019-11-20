let url_base = 'http://18.215.242.203:3000'

let issuesData , branchsData, prData, commitsData, rankingData, profileData

let weights = [4,5,2,3] // default weights

let sprintLength = 7

function getMetrics() 
{
    return new Promise((resolve, reject) =>{
        chrome.runtime.sendMessage({metric: weights, getProfile: false, profile: ""}, function(response) 
        {
            if (response !== undefined)
            {
                commitsData = response[0]
                issuesData = response[1]
                branchsData = response[2]
                prData = response[3]
                rankingData = response[4]
                profileData = response[5]
            }
        })
        resolve('metrics Done')
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

function homeBtn(){
    return new Promise((resolve, reject)=>{
        let homeBtn = document.getElementById('gbdHomeBtn')
        homeBtn.addEventListener('click', () => {
            try{
                document.getElementsByClassName('gbdContent')[0].innerHTML = initScreen()
            }catch(err) {
                console.log('GBD error:', err)
            }
         })
         resolve('Home Button ready')
    })
    
 }

 function placeScreen(){
     return new Promise((resolve, reject)=>{
         let mainContainer = document.getElementById('gbdScreen')
         mainContainer.innerHTML = gbdScreen()
         resolve('GBD screen Ready')
     })
 }

 function placeContainer(){
     return new Promise((resolve, reject)=>{
        let mainContainer = document.getElementsByTagName('div')
        let containgerPattern = /.*(container-lg clearfix new-discussion-timeline experiment-repo-nav)+.*/ 
        for(let i = 0 ; i < mainContainer.length ; i++){
            let className = mainContainer[i].className
            let answer = containgerPattern.exec(className)
            if (answer != null){
                mainContainer[i].innerHTML = loadPage()
                mainContainer[i].style.maxWidth = '100%'
                break;
            }         
        }
        resolve('MainContainer Ready')
     })
 }

 function plotGraphics(){
    return new Promise((resolve, reject)=>{
        if (typeof chrome.app.isInstalled !== 'undefined'){
            chrome.runtime.sendMessage({metric: weights}, function(response) {
                if (response !== undefined){

                    commitsData = response[0]
                    issuesData = response[1]
                    branchsData = response[2]
                    prData = response[3]
                    rankingData = response[4]
                    profileData = response[5]

                    
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
                        console.log('GBD error:', err)
                    }
                }else
                    console.log('undefined response')
            })
        }
        else
            console.log('undefined chrome app')

        resolve('Grafichs Done')
    })
 }

async function initScreen() {   
    
    //function to control the select behavior in buttons inside navbar
    zhplugin()
    selectBehavior()
    try{
        await placeContainer()
        plotProgress()
        await placeScreen()
        await homeBtn()
        await plotGraphics()
        settingsOnClick()
        setTimeout(function(){
            plotRanking()
        },3000)   
        
    }catch(err){
        console.log('GBD error:', err)
    }

    
    
        
}

$(document).on("click", "#settingsSave", function() 
{
    sprintLength = $('#sprintLength').val()
    weights[0] = $('#mergedWeight').val()
    weights[1] = $('#commitsWeight').val()
    weights[2] = $('#openWeight').val()
    weights[3] = $('#commentsWeight').val()
    alert("Configurations saved!")
    getMetrics()
})

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
                console.log(METRICS[type].split('Dashboard')[0])
                window.location.hash = `#breakdown/${METRICS[type].split('Dashboard')[0]}`
            }
        })
    }
}

function gbdButtonOnClick() {
    return new Promise((resolve, reject)=>{
        const gbdtab = document.getElementById('gbdButton')
        if (gbdtab !== null){
            gbdtab.addEventListener('click', function(){
                let screen = document.getElementById('gbdScreen')
                if (screen == null && window.location.href.includes('#breakdown'))
                    initScreen()
                    selectBehavior()
                    zenhubOnClick()  
            })
        }
        resolve('ok')
    })
}

    

async function initExtension(){
    await getMetrics()
    await gbdButtonOnClick()
}


try{
    initExtension()
}
catch(err){
    console.log('GBD error:', err)
}


