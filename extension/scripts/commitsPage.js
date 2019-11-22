function commitsPage(){

    let commitPage = 
    `
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <div class="table-responsive">
                    <table class="table table-hover table-dark" id="commitsRanking">
                        <thead>
                            <tr>
                                <th scope="col">Rank</th>
                                <th scope="col">User</th>
                                <th scope="col">Total of commits</th>
                            </tr>
                        </thead>
                    </table>
                    </div>
                </div>

                <div class="col">
                    <div class="row">
                        <div class="card text-white bg-dark mb-3">
                            <canvas id="commitsTimeDashboard"></canvas>   
                        </div>
                    </div>
                    <div class="row">
                        <div class="card text-white bg-dark mb-3">
                            <canvas id="commitsTimeDashboard"></canvas>   
                        </div>
                    </div>
                </div>
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
