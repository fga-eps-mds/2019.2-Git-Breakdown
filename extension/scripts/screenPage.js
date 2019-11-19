

function gbdScreen()
{
    let urlLogo = chrome.extension.getURL("images/logo.jpg")
    let urlCog = chrome.extension.getURL("images/cog-8x.png")
    let gbdScreen = 
    `  
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="box-shadow: 1px 1px 1px 1px black;
        border-radius: 20px;">
            <a class="navbar-brand" href="#breakdown"><img src="${urlLogo}" width="30" height="30" class="d-inline-block align-top"> GitBreakdown</a>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a id="gbdHomeBtn" class="nav-link" href="#breakdown">Home</a>
                        </li>
                        <li class="nav-item dropdown active">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Metrics
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#breakdown/commits">Commits</a>
                                <a class="dropdown-item" href="#breakdown/issues">Issues</a>
                                <a class="dropdown-item" href="#breakdown/branches">Branches</a>
                                <a class="dropdown-item" href="#breakdown/pr">Pull Request</a>
                            </div>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <button type="button" class="btn btn-outline-info" id="settingsButton" data-toggle="modal" data-target="#settingsModal">
                                <img src="${urlCog}" width="30" height="30" class="d-inline-block align-top">
                            </button>
                        </li>
                    </ul>
                    <div class="modal fade" id="settingsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title">Settings</h2>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        <div class="modal-body">
                            <form>
                                <div id="formInput">
                                    <label for="SprintLength">Sprint length in days: </label>
                                    <input type="number" name="SprintLength" id="sprintLength" min="1" max="10">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="settingsSave">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <div class="gbdContent">
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
                <div id="legends">
                    <label>Contribution status Legends</label>
                    <div id="good">good</div>
                    <div id="ok">ok</div>
                    <div id="bad">bad</div>
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
    </div>
    `
    return gbdScreen
}




function plotRanking(){
    let ranking = document.getElementById('gbdRanking')
    let tbody = document.createElement('tbody')
    tbody.id = 'gbdRankingTbody'
    let pos = 1
    try{
        for(user in rankingData){
            
            let tr = document.createElement('tr')
            tr.innerHTML = 
            `
                <th scope="row">${pos}</th>
                <td><img class="rankingImg" id="${rankingData[user].name}">${rankingData[user].name}</td>
                <td>${rankingData[user].score}</td>
                
            `
            pos+=1
            tbody.appendChild(tr)
            tr.id = `${rankingData[user].name}`
            tr.addEventListener('click', ()=>{
                window.location.hash = `#breakdown/Profile=${tr.id}`
        
            })

            tr.onpointerover = () => {
                tr.style.opacity = '50%'
            }

            tr.onpointerleave = () => {
                tr.style.opacity = '100%'
            }
            

           
        }
       
    }catch(err){
        console.log("GBD error:", err)
    }

    ranking.appendChild(tbody)

    plotColorStatus()
}


function plotColorStatus(){
    let ranking = document.getElementById('gbdRankingTbody').childNodes

    let avarage = getScoreAvarage(rankingData)

    for(user in ranking){
        if(ranking[user].id != undefined)
            if(rankingData[user].score > avarage+15)
                document.getElementById(ranking[user].id).style.backgroundColor = 'green'
            else if( rankingData[user].score < avarage+15 && rankingData[user].score > avarage-15)
                document.getElementById(ranking[user].id).style.backgroundColor = 'blue'
            else
                document.getElementById(ranking[user].id).style.backgroundColor = 'red'
    }

   

}

function getScoreAvarage(rankingData){
    let scoreAvarage = 0
    let total = 0

    for(user in rankingData){
        if(rankingData[user].score != undefined){
            scoreAvarage += rankingData[user].score
            total++
        }
    }
    return scoreAvarage / total
}
