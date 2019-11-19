//this function is not used yet
function profilePage(user, profile){
    let profilePage = 
    `
<div class="container emp-profile">
        <div class="row">
            <div class="col-md-4">
                <div class="profile-img">
                    <img src="${profile.avatar}" id="avatar" alt=""/>
                </div>
            </div>
            <div class="col-md-6">
                <div class="profile-head">
                    <h1>
                        <a href="https://github.com/${user[0].name}">
                        ${user[0].name}
                        </a>
                    </h1>
                    </br>
                    <h2>
                        ${profile.bio}
                    </h2>
                    <p class="proile-rating">RANKING:${user[1]}/${user[2]}</p>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                         <li class="nav-item">
                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="profile-work">
                    <p>Location:${getLocation(profile.location)}</p>
                </div>
            </div>
            <div class="col-md-8">
                <div class="tab-content profile-tab" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div class="row">
                            <div class="col">
                                <div class="row">
                                    <div = class="card text-white bg-dark mb-3">
                                        <canvas id="percentIssues"></canvas>
                                    </div>
                                </div>
                                <div class="row">

                                    <canvas id="2"></canvas>

                                </div>
                            </div>
                            <div class="col">
                                <div class="row">
                                    <div = class="card text-white bg-dark mb-3">
                                        <canvas id="percentCommits"></canvas>
                                    </div>
                                </div>
                                <div class="row">

                                    <canvas id="4"></canvas>   

                                </div>
                            </div>
                        </div>
                    </div>
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
            }
            else
            {
                console.log("profile response undefined")
            }

            
        })
    })
    
}


function getLocation(location){
    if (location != null){
        return location
    }else{
        return 'unknown'
    }
}