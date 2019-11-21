//this function is not used yet
function profilePage(user, profile){
    let profilePage = 
    `
    <div class="container-fluid">
        <div class="row">
            <div class="col-3" id="profilePageSideBar">
                <div class="profileImage">
                    <a href="https://github.com/${profile.login}">
                        <img src="${profile.avatar}" id="GbdProfileAvatar">
                    </a>
                        </div>
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                       Contribution Ranking
                    <span class="badge badge-primary badge-pill">${user[1]}/${user[2]}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                       Location:
                    <span class="badge badge-primary badge-pill">${getLocation(profile.location)}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                       ${getBio(profile.bio)}
                    </li>
                </ul>
            </div>
            <div class="col-8" id="profileCol-8">
                <div style="text-align: center; padding-bottom:5%; padding-top:5%; font-size:initial;">
                    <label >${profile.login}'s participation</label>
                </div>
                <div class="row">
                    <span>
                        <div class="card text-white bg-dark mb-3">
                            <canvas id="percentPullRequests"></canvas>
                        </div>
                        <div>
                            <table class="table-bordered" id="MergedPrPercent">
                                <thead>
                                    <tr> 
                                        <th scope="col" style="width:30%;">PR send </th>
                                        <th scope="col" style="width:30%;"> Total </th>
                                        <th scope="col"> ${profile.login} participation </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </span> 
                </div>
                <div class="row">
                    <span>
                        <div class="card text-white bg-dark mb-3">
                            <canvas id="percentCommits"></canvas>
                        </div>
                        <div>
                            <table class="table-bordered" id="CommitsPercent">
                                <thead>
                                    <tr>
                                        <th scope="col" style="width:30%;"> Commits</th>
                                        <th scope="col" style="width:30%;"> Total </th>
                                        <th scope="col">${profile.login} participation</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </span>
                </div>
                <div class="row">
                    <span>
                        <div class="card text-white bg-dark mb-3">
                            <canvas id="percentIssues"></canvas>
                        </div>
                        <div>
                            <table class="table-bordered" id="OpenedIssuesPercent">
                                <thead>
                                    <tr>
                                        <th scope="col" style="width:30%;"> Issues Opened</th>
                                        <th scope="col" style="width:30%;"> Total </th>
                                        <th scope="col"> ${profile.login} participation </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    <span>
                </div>
            </div>
        </div>
    </div>
    `
    return profilePage
}


function findUser(){
    let url = window.location.hash
    url = url.split('=')
    for(user in rankingData){
        if( url[1] === rankingData[user].name)
            return [rankingData[user],  ((+user)+(+1)).toString(), rankingData.length]
    }
}


function getProfile(username) 
{
    return new Promise((resolve, reject) =>{
        chrome.runtime.sendMessage({metric: weights, getProfile: true, profile: username}, function(response) 
        {
            if (response !== undefined)
            {   
                
                document.getElementsByClassName('gbdContent')[0].innerHTML = profilePage(findUser(), response[0])
                avatarDisplay()
            }
            else
            {
                console.log("profile response undefined")
            }

            
        })
        resolve('profile displaying')
    })
    
}


function getLocation(location){
    if (location != null){
        return location
    }else{
        return 'unknown'
    }
}

function getBio(bio){
    if (bio != null)
        return bio
    else
        return ' '
}

function avatarDisplay(){
    let avatar = document.getElementById('GbdProfileAvatar')

    avatar.onmousemove = () => {
        avatar.style.opacity = "50%"
    }

    avatar.onmouseleave = () => {
        avatar.style.opacity = "100%"
    }
}
