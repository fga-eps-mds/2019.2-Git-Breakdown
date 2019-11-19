
function calcPercentCommits(commitsData, userName){
    let totalCommits = 0
    for(user in commitsData)
        totalCommits += commitsData[user].commits

    let userCommits = commitsData.filter((commits)=>{
        return commits.name === userName
    })


    let percent = ((+userCommits[0].commits) / (+totalCommits)).toString() * 100
    
    return percent

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
    return percent
    
}


function calcPercentClosedIssues(rankingData, userName){
    let totalClosedIssues = 0

    for(user in rankingData){
        if(rankingData[user].closed_issues != undefined)
            totalClosedIssues += rankingData[user].closed_issues
    }
}