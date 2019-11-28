let url_base = 'http://18.215.242.203:3000'

let issuesData, branchsData, prData, commitsData, rankingData, profileData


let weights = [4,5,2,3] // default weights

let sprintLength = 7

let init_week_day = 0

let date_unix_time = 0


function getMetrics(updateRanking, unix_time, week_day, sprint_length) 
{
    if (updateRanking === undefined)
    {
        console.log("updateRanking undefined")
        updateRanking = false
    }

    commitsData = []

    return new Promise((resolve, reject) =>{
        chrome.runtime.sendMessage({metric: weights, getProfile: false, profile: "", unix_time:unix_time, weekday: week_day, sprintLength: sprint_length}, function(response) 
        {
            console.log("getting info")
            if (response !== undefined)
            {
                commitsData = response[0]
                issuesData = response[1]
                branchsData = response[2]
                prData = response[3]
                rankingData = response[4]
                profileData = response[5]

                if (updateRanking)
                {
                    alert("Configurations saved.")
                    let ranking = document.getElementById('gbdRanking')
                    if (ranking !== null)
                    {
                        console.log("updating ranking")
                        updateCommitsHashChange = true
                        setTimeout(function(){
                            plotRanking(updateRanking)
                        },3000)  
                    }
                    else
                    {
                        updateRankingHashChange = true
                        plotCommiters(true)
                    }   
                }
            }
            else
            {
                console.log("response undefined")
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

function homeBtn(shouldRequest){
    return new Promise((resolve, reject)=>{
        let homeBtn = document.getElementById('gbdHomeBtn')
        homeBtn.addEventListener('click', () => {
            try{
                document.getElementsByClassName('gbdContent')[0].innerHTML = initScreen(true)
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

         $("#gbdQuestionMark").popover({
            title: 
                `<h3 class="custom-title">
                    Color info 
                </h3>`,
            content: 
                `<p>
                    Colors represent the user contribution to the repository
                    based on contribution avarage
                </p>
                <p>
                    <span id="gbdGreenMark">Green</span>: User contributed more than 30% of average.
                </p>
                <p>
                    <span id="gbdBlueMark">Blue</span>: User is in a range of 30% of the avarage(plus or minus).
                </p>
                <p>
                    <span id="gbdRedMark">Red</span>: User is bellow 30% of the avarage.
                </p>
                `,
            html: true,
        })
        
         resolve('GBD screen Ready')
     })
     
 }

 function placeContainer(page){
     return new Promise((resolve, reject)=>{
        let mainContainer = document.getElementsByTagName('div')
        let containgerPattern = /.*(container-lg clearfix new-discussion-timeline experiment-repo-nav)+.*/ 
        for(let i = 0 ; i < mainContainer.length ; i++){
            let className = mainContainer[i].className
            let answer = containgerPattern.exec(className)
            if (answer != null){
                mainContainer[i].innerHTML = page
                mainContainer[i].style.maxWidth = '100%'
                break;
            }         
        }
        resolve('MainContainer Ready')
     })
 }

 function getCommitsData() 
{
    return new Promise((resolve, reject) =>{
        chrome.runtime.sendMessage({metric: weights, getProfile: false, profile: '', getCommitsData: true, unix_time:date_unix_time, weekday: init_week_day, sprintLength: sprintLength}, function(response) 
        {
            if (response !== undefined)
            {   
                console.log("RESPONSE FROM COMMITS")
                commitsData = response[0]
            }
            else
            {
                console.log("commits response undefined")
            }
        })
        resolve('profile displaying')
    })
    
}

 function onlyPlot()
 {

    try
    {
        if (commitsData === undefined)
        {
            console.log('commits data undefined from inside plottting funciton')
            getCommitsData()
            setTimeout(function()
            {
                onlyPlot()
            },2000)  
        }
        else if (commitsData.length === 0)
        {
            console.log('commits data length is 0 from inside plottting funciton')
            getCommitsData()
            setTimeout(function()
            {
                onlyPlot()
            },2000)  
        }
        else
        {
            let issuesCtx = document.getElementById('issuesDashboard').getContext('2d')
            createIssuesChart(issuesData, issuesCtx)
            
            let commitCtx = document.getElementById('commitsDashboard').getContext('2d')
            createCommitsChart(commitsData, commitCtx)

            let branchesCtx = document.getElementById('branchesDashboard').getContext('2d')
            createBranchesChart(branchsData, branchesCtx)

            let prCtx = document.getElementById('prsDashboard').getContext('2d')
            createPRChart(prData, prCtx)
        }

    }
    catch(err)
    {
        console.log(err)
        console.log("get metrics from inside onlyPlot()")
        getMetrics(false, date_unix_time, init_week_day, sprintLength)
    }
 }

 function plotGraphics(){
    return new Promise((resolve, reject)=>{
        if (typeof chrome.app.isInstalled !== 'undefined'){
            console.log("sending message")
            chrome.runtime.sendMessage({metric: weights, unix_time: date_unix_time, weekday: init_week_day, sprintLength: sprintLength}, function(response) {
                if (response !== undefined){
                    console.log("message received")
                    commitsData = response[0]
                    issuesData = response[1]
                    branchsData = response[2]
                    prData = response[3]
                    rankingData = response[4]
                    profileData = response[5]
                    
                    try{

                        console.log("PLOTTING")

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

        resolve('Graphics Done')
    })
 }

async function initScreen(shouldRequest) {   
    console.log('initScreen()')
    //function to control the select behavior in buttons inside navbar
    zhplugin()
    selectBehavior()
    try{
        await placeContainer(gbdScreen())
        await homeBtn(shouldRequest)
        settingsOnClick()
        setTimeout(function(){
            onlyPlot()
            plotRanking(false)
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
    init_week_day = $('#weekdaylist').val()
    date_unix_time = Math.floor(new Date($('#initdate').val()).getTime() / 1000)

    alert("Please wait for configurations to update.")
    getMetrics(true, date_unix_time, init_week_day, sprintLength)

    $('#settingsButton').popover('hide')
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
                {
                    chrome.storage.sync.get('oauth2_token', (res)=>{
                        if(res.oauth2_token != undefined){
                            console.log('oauth->1', res.oauth2_token)
                            initScreen(true)
                            selectBehavior()
                            zenhubOnClick() 
                        }
                        else{
                            console.log('oauth->2', res.oauth2_token)
                            selectBehavior()
                            zenhubOnClick() 
                            placeContainer(loginPage())
                            login()
                        }    
                    })      
                }    
            })
        }
        resolve('ok')
    })
}

    

async function initExtension(){
    await getMetrics(false, 0, 0, 7)
    await gbdButtonOnClick()
}


try{
    initExtension()
}
catch(err){
    console.log('GBD error:', err)
}


