//this function is not used yet
function profilePage(){
    let profilePage = 
    `
    <div class="row">
        <div class="col">
            <div class="table-responsive">
                <table class="table table-hover table-dark" id="gbdRanking">
                    <thead>
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">User</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div class="col">
            <div class="row">
                <div class="card text-white bg-dark mb-3">
                    <canvas id="issuesDashboard"></canvas>   
                </div>
            </div>
            <div class="row">
                <div class="card text-white bg-dark mb-3">
                    <canvas id="branchesDashboard"></canvas> 
                </div>
            </div>
        </div>
        <div class="col">
            <div class="row">
                <div class="card text-white bg-dark mb-3 right">
                    <canvas id="commitsDashboard"></canvas>
                </div>
            </div>
            <div class="row">
                <div class="card text-white bg-dark mb-3 right">
                    <canvas id="prsDashboard"></canvas>   
                </div>
            </div>
        </div>
    </div>
    `
    return profilePage
}


function displayMember(){

    let url = window.location.hash
    url = url.split('=')

    let memberCommits = commitsData.filter((member) => {
        return member.name === url[1]
    })
   
    
    let commitCtx = document.getElementById('commitsDashboard').getContext('2d')
    createCommitsChart(memberCommits, commitCtx)

   

}