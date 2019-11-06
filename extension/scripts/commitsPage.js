
function commitsPage(){

    let commitPage = 
    `
        <h2 class="metricsPageTitle">CommitsPage</h2>
        <div id="commitsContainer">
            <div id="repoCommiters">
            </div>
            <div id="progressContainer">
            </div>
        </div>

    `
    return commitPage
}



function plotTop10Commiter(){
    let repoCommiters = document.getElementById("repoCommiters")
    for(let i = 1; i <= commitsData.length; i++){
        if (commitsData[i] != undefined){
            let member = commitsData[i].name
            let memberTotalCommits = commitsData[i].commits
            let commiterData = document.createElement('div')
            commiterData.innerHTML = 
            `
                <div class="commitsRanking">
                    <div id="img">i</div>
                    <div>${member} <i> ${memberTotalCommits}</i> commits</div>
                </div>
            `
            repoCommiters.appendChild(commiterData)
        }
    }
}