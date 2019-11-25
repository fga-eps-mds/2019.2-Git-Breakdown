function loginPage(){
    let urlLogo = chrome.extension.getURL("images/logo.jpg")
    let loginPage = 
    `
    <div class="container-fluid" style="text-align:center;">
        <h2>Make login to start use GitBreakDown</h2>
        <div id="login">
			<button type="button" class="btn btn-primary btn-dark " id="loginButton">Login</button>
    	</div>
        <div>
            <img src="${urlLogo}" >
        </div>
        
    </div>
    
    `


    return loginPage
}


function login(){
    const url = 
    `https://github.com/login/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&scope=repo`

    let loginButton = document.getElementById('loginButton')
    loginButton.addEventListener('click', () =>{
        window.open(url)
        location.reload()
    })
   
}
