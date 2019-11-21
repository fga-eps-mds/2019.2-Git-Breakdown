
function calcPercentCommits(commitsData, userName){
    let totalCommits = 0
    for(user in commitsData)
        totalCommits += commitsData[user].commits

    let userCommits = commitsData.filter((user)=>{
        return user.name === userName
    })

    

    let percent = ((+userCommits[0].commits) / (+totalCommits)).toString() * 100    
    return [totalCommits, userCommits[0].commits, percent]
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
    let percent = ((+userOpenedIssues[0].opened_issues) / (+totalOpenedIssues)).toString() * 100

    return [totalOpenedIssues, userOpenedIssues[0].opened_issues, percent]
}

//closed_issues always 0 in the server response
function calcPercentClosedIssues(rankingData, userName){
    let totalClosedIssues = 0

    for(user in rankingData){
        if(rankingData[user].closed_issues != undefined)
            totalClosedIssues += rankingData[user].closed_issues
    }

    let userClosedIssues = rankingData.filter((user)=>{
        return user.name === userName
    })

    let percent = ((+userClosedIssues[0].closed_issues) / (+totalClosedIssues)).toString() * 100

    return [percent]
}


function calcPercentMergedPullRequest(rankingData , userName){
    let totalPrMerged = 0
    for(user in rankingData){
        if(rankingData[user].merged_pull_requests != undefined)
            totalPrMerged += rankingData[user].merged_pull_requests
    }

    let userMergedPrs = rankingData.filter((user)=>{
        return user.name === userName
    })

  
    let percent = ((+userMergedPrs[0].merged_pull_requests) / (+totalPrMerged)).toString() * 100

 
    return [totalPrMerged, userMergedPrs[0].merged_pull_requests, percent]

}

function createPercentGraphic(data, ctx, labels , label, title)
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
                data: [data[0], data[1]],
                backgroundColor: 
                [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)'
                ],
                borderColor: 
                [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
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


        let percentOpenedIssues = calcPercentOpenedIssues(rankingData, userName)
        let percentOpenedIssuesGraphic = document.getElementById('percentIssues').getContext('2d')
        let percentOpenedIssuesLabels = ['total of issues', `issues opened by ${userName}`]
        createPercentGraphic(percentOpenedIssues, percentOpenedIssuesGraphic, percentOpenedIssuesLabels,
          '# of issues opened', `issues opened by ${userName}`)

        let percentMergedPr = calcPercentMergedPullRequest(rankingData, userName)
        let percentMergedPrGraphic = document.getElementById('percentPullRequests').getContext('2d')
        let percentMergedPrLabels = ['total of merged Pull Requests', `Pull requests merged by ${userName}`]
        createPercentGraphic(percentMergedPr , percentMergedPrGraphic , percentMergedPrLabels,
            '# of merged Pull Request', `Pull requests merged by ${userName}`)

        let percentCommits = calcPercentCommits(commitsData , userName)
        let percentCommitsGraphic = document.getElementById('percentCommits').getContext('2d')
        let percentCommitsLabels = ['total of commits', `${userName} commits`]
        createPercentGraphic(percentCommits, percentCommitsGraphic, percentCommitsLabels,
            '# of commits', `commits from ${userName}`)
        
        return {
            'OpenedIssuesPercent' : percentOpenedIssues, 
            'MergedPrPercent' : percentMergedPr , 
            'CommitsPercent' : percentCommits}

}


// function displayTableInfo(userContribution , tableId){
//     let infoTab = document.getElementById(tableId)
//     let tbody = document.createElement('tbody')
//     tbody.id = `${tableId}-tbody`
//     for(data in userContribution){
//         let tr = document.createElement('tr')
//         tr.innerHTML = 
//         `

//         `
//     }
    
// }