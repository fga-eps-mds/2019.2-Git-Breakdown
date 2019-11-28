let count_commits = 0


function calcPercentCommits(fullData, userName){
    try
    {
        let totalCommits = 0
        if (fullData !== undefined && fullData.length > 0)
        {
            let data = []
            for (let i = 0; i < fullData.length-4; i++)
            {
                if (fullData[i].name !== undefined)
                {
                    data[i] = fullData[i]
                    totalCommits += fullData[i].commits
                }
            }

            console.log(data)

            let userCommits = data.filter((user)=>{
                return user.name === userName
            })

            console.log(userCommits)

            let avarage = totalCommits / data.length
            let x = avarage * 0.3
            let userStatus

            if(userCommits != undefined && userCommits[0].commits != undefined)
                if(userCommits[0].commits > avarage + x)
                    userStatus = 1 //very good
                else if(userCommits[0].commits < avarage+x && userCommits[0].commits > avarage-x)
                    userStatus = 0 //ok / expected
                else
                    userStatus = -1 //not good
            else
                userCommits[0].commits = 0

            let percent
            if(totalCommits !== 0){
                percent = ((+userCommits[0].commits) / (+totalCommits)).toString() * 100
            }else{
                percent = 0
            } 
            count_commits = 0
            return [userCommits[0].commits ,totalCommits, percent, userStatus]
        }
        else
        {
            console.log("data undefined or length is 0")
            if (count_commits > 5)
            {
                alert("API not working properly right now. Try logging in again in the extension.")
                return
            }
    
            getCommitsData()
            count_commits++
            setTimeout(function()
            {
                let userContribution = plotPercentGraphics(userName)
                for(var key in userContribution){
                    displayTableInfo(userContribution[key], key) //metricsCalc.js
                }
            }, 2000) 
        }
    }
    catch (err)
    {
        console.log('err from inside percent commits' + err)
    }
}


function calcPercentOpenedIssues(rankingData , userName){
    let totalOpenedIssues = 0
    for(user in rankingData){
        if (rankingData[user].opened_issues != undefined)
            totalOpenedIssues += rankingData[user].opened_issues
    }
    let userOpenedIssues = rankingData.filter((user)=>{
        return user.name === userName
    })

    if(userOpenedIssues[0].opened_issues === undefined)
    userOpenedIssues[0].opened_issues = 0

    let userStatus
    let percent
    if (totalOpenedIssues !== 0 && userOpenedIssues[0].opened_issues != undefined){
        percent = ((+userOpenedIssues[0].opened_issues) / (+totalOpenedIssues)).toString() * 100
        let avarage = totalOpenedIssues / rankingData.length
        let x = avarage * 0.3
       
        if(userOpenedIssues[0].opened_issues > avarage + x)
            userStatus = 1 //very good
        else if(userOpenedIssues[0].opened_issues < avarage+x && userOpenedIssues[0].opened_issues > avarage-x)
            userStatus = 0 //ok / expected
        else
            userStatus = -1 //not good
    }else{
        userOpenedIssues[0].opened_issues = 0
        percent = 0
    }
    return [userOpenedIssues[0].opened_issues, totalOpenedIssues,  percent, userStatus]
}

// //closed_issues always 0 in the server response
// function calcPercentClosedIssues(rankingData, userName){
//     let totalClosedIssues = 0

//     for(user in rankingData){
//         if(rankingData[user].closed_issues != undefined)
//             totalClosedIssues += rankingData[user].closed_issues
//     }

//     let userClosedIssues = rankingData.filter((user)=>{
//         return user.name === userName
//     })

//     let percent = ((+userClosedIssues[0].closed_issues) / (+totalClosedIssues)).toString() * 100

//     return [percent]
// }


function calcPercentMergedPullRequest(rankingData , userName){
    let totalPrMerged = 0
    for(user in rankingData){
        if(rankingData[user].merged_pull_requests != undefined)
            totalPrMerged += rankingData[user].merged_pull_requests
    }

    let userMergedPrs = rankingData.filter((user)=>{
        return user.name === userName
    })
    let userStatus
    let percent 
    if (totalPrMerged !== 0 && userMergedPrs[0].merged_pull_requests != undefined)
    {
        percent = ((+userMergedPrs[0].merged_pull_requests) / (+totalPrMerged)).toString() * 100
        let avarage = totalPrMerged / rankingData.length
        let x = avarage * 0.3
        if(userMergedPrs[0].merged_pull_requests > avarage + x)
            userStatus = 1 //very good
        else if(userMergedPrs[0].merged_pull_requests < avarage+x && userMergedPrs[0].merged_pull_requests > avarage-x)
            userStatus = 0 //ok / expected
        else
            userStatus = -1 //not good
    }
    else{
        percent = 0
        userMergedPrs[0].merged_pull_requests = 0
    }
    return [userMergedPrs[0].merged_pull_requests, totalPrMerged,  percent, userStatus]
}

function createPercentGraphic(data, ctx, labels , label, title, color)
{
    const PercentChart= new Chart(ctx, 
    {
        type: 'pie',
        data: 
        {
            labels: [labels[0], labels[1]],
            datasets: 
            [{
                label: label,
                fontColor: 'white',
                data: [data[1], data[0]],
                backgroundColor: 
                [
                    'rgb(255, 255, 255)',
                    color
                ],
                borderWidth: 1
            }]
        },
        options: 
        {
            tooltips:
            {
                titleFontSize: 12,
                bodyFontSize: 12
            },
            maintainAspectRatio: false,
            title:
            {
                fontSize: 12,
                fontColor: 'white',
                display: true,
                text: title
            },
            scales: 
            {
                ticks: 
                {
                    display: false
                }
            },
            legend: {
                labels: {
                    fontColor: 'white',
                    fontSize: 12
                }
            }
        }
    })
} 


function plotPercentGraphics(userName){
    try
    {
        console.log("plotting percent graphics")
        let percentOpenedIssues = calcPercentOpenedIssues(rankingData, userName)
        let percentOpenedIssuesGraphic = document.getElementById('percentIssues').getContext('2d')
        let percentOpenedIssuesLabels = ['total of issues', `issues opened by ${userName}`]
        createPercentGraphic(percentOpenedIssues, percentOpenedIssuesGraphic, percentOpenedIssuesLabels,
            `issues opened by ${userName}`, `In issues opened`, defineColor(percentOpenedIssues[3]))

        let percentMergedPr = calcPercentMergedPullRequest(rankingData, userName)
        let percentMergedPrGraphic = document.getElementById('percentPullRequests').getContext('2d')
        let percentMergedPrLabels = ['total of merged Pull Requests', `Merged pull requests opened by ${userName}`]
        createPercentGraphic(percentMergedPr , percentMergedPrGraphic , percentMergedPrLabels,
            `Pull requests merged by ${userName}`, ` In merged Pull Requests`, defineColor(percentMergedPr[3]))

        let percentCommits = calcPercentCommits(commitsData, userName)
        let percentCommitsGraphic = document.getElementById('percentCommits').getContext('2d')
        let percentCommitsLabels = ['total of commits', `${userName} commits`]
        createPercentGraphic(percentCommits, percentCommitsGraphic, percentCommitsLabels,
            `commits from ${userName}`,  `In commits`, defineColor(percentCommits[3]))
        
        return {
        'OpenedIssuesPercent' : percentOpenedIssues, 
        'MergedPrPercent' : percentMergedPr , 
        'CommitsPercent' : percentCommits}

        
    }
    catch(err)
    {
        console.log('error: ', err)
        if (document.getElementById('percentIssues') === null)
        {
            console.log("screen is null")
            alert("An error occurred in Chrome Extensions. Please re-load this tab.")
        }
    }
}


function displayTableInfo(userContribution , tableId){
    let infoTab = document.getElementById(tableId)
    let tbody = document.createElement('tbody')
    tbody.id = `${tableId}-tbody`
    let tr = document.createElement('tr')
    tr.innerHTML = 
    `
        <td>${userContribution[0]}</td>
        <td>${userContribution[1]}</td>
        <td id="${tableId}-td">${userContribution[2].toFixed(2)}%</td>
    `

    tbody.appendChild(tr)
    infoTab.appendChild(tbody)
    tableColorPercent(userContribution[3], tableId)
}


function tableColorPercent(status, id){
    let table = document.getElementById(`${id}-td`)
    table.style.backgroundColor = defineColor(status)
   
}


function defineColor(status){
    if (status === 1)
       return 'green'
    else if(status === 0)
        return 'blue'
    else
        return 'red'
}