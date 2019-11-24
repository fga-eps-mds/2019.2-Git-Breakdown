

function gbdScreen()
{
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth()+1
    let yyyy = today.getFullYear()

    if (dd < 10)
        dd='0'+dd
    
    if (mm < 10)
        mm='0'+mm
    
    today = yyyy+'-'+mm+'-'+dd

    let urlLogo = chrome.extension.getURL("images/logo.jpg")
    let urlCog = chrome.extension.getURL("images/cog-8x.png")
    let gbdScreen = 
    `  
    <div id="gbdScreen">
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


                
                <div id="settingsContent" class="hide">

                    <ul class="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                        <li class="active"><a class="nav-item nav-link active" id="nav-time-tab" data-toggle="tab" href="#time" role="tab">Time</a></li>
                        <li class="tab"><a class="nav-item nav-link" id="nav-metrics-tab" data-toggle="tab" href="#metrics" role="tab">Metrics</a></li>
                    </ul>
                    

                    <div class="tab-content">
                        <div class="tab-pane active" id="time">
                            <form style="margin-top: 8%;">
                                <label for="SprintLength">Sprint length in days: </label>
                                <input type="number" name="SprintLength" value="7" id="sprintLength" min="1" max="10">
                            </form>
                            <form style="margin-top: 8%;">
                                <label for="InitialDay">Weekday that each sprint starts: </label>
                                <select name="InitialDay" id="weekdaylist">
                                    <option value="0">Sunday</option>
                                    <option value="1">Monday</option>
                                    <option value="2">Tuesday</option>
                                    <option value="3">Wednesday</option>
                                    <option value="4">Thursday</option>
                                    <option value="5">Friday</option>
                                    <option value="6">Saturday</option>
                                </select>
                            </form>
                            <form style="margin-top: 8%;">
                                <label for="initdate">Starting date of sprint 1: </label>
                                <input type="date" id="initdate" name="initdate" min="2019-01-01" max="${today}">
                            </form>
                        </div>

                        <div class="tab-pane" id="metrics">
                            <form style="margin-top: 8%;">
                                <label for="commitsWeight">Weight for total of commits: </label>
                                <input type="number" name="commitsWeight" value="4" id="commitsWeight" min="1" max="10">
                            </form>
                            <form style="margin-top: 2%;">
                                <label for="mergedWeight">Weight for total of merged pull requests: </label>
                                <input type="number" name="mergedWeight" value="5" id="mergedWeight" min="1" max="10">
                            </form>
                            <form style="margin-top: 2%;">
                                <label for="openWeight">Weight for total of opened issues: </label>
                                <input type="number" name="openWeight" value="2" id="openWeight" min="1" max="10">
                            </form>
                            <form style="margin-top: 2%;">
                                <label for="commentsWeight">Weight for total of comments on pull requests: </label>
                                <input type="number" name="commentsWeight" value="3" id="commentsWeight" min="1" max="10">
                            </form>
                        </div>
                    </div>

                    <div class="footer" style="margin-top: 50%; margin-left: 85%;">
                        <button type="button" class="btn btn-primary btn-lg" id="settingsSave">Save</button>
                    </div>
                </div>



                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <button type="button" class="btn btn-outline-info" id="settingsButton" data-toggle="popover">
                            <img src="${urlCog}" width="30" height="30" class="d-inline-block align-top">
                        </button>
                    </li>
                </ul>

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
        <button type="button" id="gbdQuestionMark" class="btn btn-lg btn-danger" data-toggle="popover" style="left:3%;">
            (?*)
        </button>
    </div>
    </div>
    `
    return gbdScreen
}




function plotRanking(updateRanking){
    if(updateRanking){
       try{
        let rankingTable = document.getElementById('gbdRanking')
        let tbody = document.getElementById('gbdRankingTbody')
        rankingTable.removeChild(tbody)
        plotRanking(false)
       }catch(err){
           console.error(err)
       }
    }
    else{
        let rankingTable = document.getElementById('gbdRanking')
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
            rankingTable.appendChild(tbody)
            plotColorStatus()
        }catch(err){
            console.log("GBD error:", err)
        }
       
    }
   

    
}


function plotColorStatus(){
    let ranking = document.getElementById('gbdRankingTbody').childNodes

    let avarage = getScoreAvarage(rankingData)
    let x = avarage * 0.3

    //x is a range of 30% of the avarage. Is used to set if some one have 30%
    //above or below avarage of parcitipation

    for(user in ranking){
        if(ranking[user].id != undefined)
            if(rankingData[user].score > avarage+x)
                document.getElementById(ranking[user].id).style.backgroundColor = 'green'
            else if( rankingData[user].score < avarage+x && rankingData[user].score > avarage-x)
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
