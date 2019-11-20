//this function is not used yet
function profilePage(user, profile){
    let profilePage = 
    `
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <div class="profileImage">
                    <img src="${profile.avatar}" id="GbdProfileAvatar">
                </div>
                <div class="profieInfo">

                </div>
            </div>
            <div class="col">
                <div class="row">
                    <div class="card text-white bg-dark mb-3">
                        <canvas id="percentPullRequests"></canvas>
                    </div>
                </div>
                <div class="row">
                   
                </div>
            </div>
            <div class="col">
                <div class="row">
                    <div class="card text-white bg-dark mb-3">
                        <canvas id="percentCommits"></canvas>
                    </div>
                </div>

                <div class="row">
                    <div class="card text-white bg-dark mb-3">
                        <canvas id="percentIssues"></canvas>
                    </div>
                </div>
            </div>
        </div>

    </div>
    `
    return profilePage
}
//percentPullRequests
//percentCommits
//percentIssues

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