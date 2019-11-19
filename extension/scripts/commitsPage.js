
function commitsPage(){

    let commitPage = 
    `
        <h2 class="metricsPageTitle">Commits Status</h2>
        <div id="metricContainer" class="container-fluid">
            <div id="repoRanking" class="overflow-auto list-group">
            </div>
            <div id="progressContainer" class="container-fluid">

            </div>
        </div>
    `
    return commitPage
}



function plotTop10Commiter(){
    let repoCommiters = document.getElementById("repoRanking")
    for(let i = 0; i < commitsData.length; i++){
        if (commitsData[i] != undefined){
            let member = commitsData[i].name
            let memberTotalCommits = commitsData[i].commits
            let commiterData = document.createElement('button')
            commiterData.className = "list-group-item list-group-item-action"
            commiterData.innerHTML = 
            `
                <div id="memberDisplay">${member} <i> ${memberTotalCommits}</i> commits</div>

            `
            repoCommiters.appendChild(commiterData)
        }
    }
}
