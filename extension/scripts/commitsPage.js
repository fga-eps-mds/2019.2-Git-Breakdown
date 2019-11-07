
function commitsPage(){

    let commitPage = 
    `
        <h2 class="metricsPageTitle">Commits Status</h2>
        <div id="metricContainer">
            <div id="repoRanking">
            </div>
            <div id="progressContainer">
                <button type="button" id="btnOpenConfigPage"></button>
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
            let commiterData = document.createElement('div')
            commiterData.className = "commitsRanking"
            commiterData.innerHTML = 
            `
                <div id="img">i</div>
                <div id="memberDisplay">${member} <i> ${memberTotalCommits}</i> commits</div>

            `
            repoCommiters.appendChild(commiterData)
        }
    }
}