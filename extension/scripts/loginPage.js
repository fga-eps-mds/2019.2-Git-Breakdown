function loginPage(){
    let urlLogo = chrome.extension.getURL("images/logo.jpg")
    let loginPage = 
    `
    <div class="container-fluid">
        <div>
            <img src="${urlLogo}">
        </div>
        <div id="login">
			<button type="button" class="btn btn-primary btn-dark " id="loginButton">Login</button>
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
    })
}
