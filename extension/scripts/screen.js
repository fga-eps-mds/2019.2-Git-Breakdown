let url_base = 'http://18.215.242.203:3000'

const gbdScreen = () => 
{
    let gbdtab = document.getElementById('gbdButton')
    let current_selected = document.getElementsByClassName('js-selected-navigation-item selected reponav-item')
    let zenhub_selected = document.getElementsByClassName('reponav-item zh-sidebar-item zh-navbar-link zh-topbar-item selected')
    
    gbdtab.classList.remove('gbdselected')

    if (zenhub_selected[0] !== undefined)
      zenhub_selected[0].classList.remove('selected')

    if (current_selected[0] !== undefined)
      current_selected[0].classList.remove('selected')

    gbdtab.className = 'js-selected-navigation-item gbdselected reponav-item'

    const addCss = () => 
    {
        let innerStyle = 
        `   
          #gbdScreen {
            border-radius : 25px;
            box-shadow: 5px 5px #e1e4e8; 
            border-top : 0;
            border-bottom : 3px #e36209 #e1e4e8 transparent;
            border-right : 3px #e36209 #e1e4e8 transparent;
            position : relative;
            width : 1000px;
            height : 500px;
            overflow-y: scroll;
            
          }
          
          #gbdSidebar {
            font: inherit;
            border-radius : 25px;
            position: absolute;
            display: block;
            text-decoration: none;
            width : 50px;
            height : 500px;
            background-color:rgba(0,51,102,0.63);
            -webkit-transition :all 0.5s;
            transition : all 0.5s;
          }
          
          #gbdSidebar:hover{
            width : 200px;
          }
          
          #gbdSidebar a{
            font-weight: 500;
            font-size : 13px;
            text-decoration : none;
            display : block;
            list-style-type : none;
            color : rgba(230, 230, 230);
            text-align : center;
            margin: 40px;
            overflow:hidden;
            transition: all 0.3s;
            -webkit-transition: all 0.3s;
            -moz-transition: all 0.3s;
          }

          .reponav-item.gbdselected{color:#24292e;background-color:#fff;border-color:rgba(0,51,102,0.7) #e1e4e8 transparent;}

          .gbdMenu:hover{
            margin : 0px;
            color : rgba(105, 107, 108, 1);
            border-bottom : 1px solid rgba(105, 107, 108, 1);
          }

          #gbdSidebar p{
            text-align : center;
            font-size: inherit;
            font-weight: 700;
            color : rgba(230, 230, 230);
            overflow: hidden;
            margin : 45px;
            border-bottom: 1px solid rgba(255, 137, 75, 0.42);
          }

          .flex-container
          {
              display: flex;
              flex-direction: column;
          }

          #gbdSidebar p:hover{
            border-bottom: 1px solid rgba(255, 137, 75, 0.42);
          }

          #commitsDiv
          {
            position: absolute;
            top: 0;
            right:0;
            width: 400px;
            height : 250px;
            
          }

          #issuesDiv
          {
            position: absolute;
            top: 0;
            left:0;
            width: 400px;
            height : 250px;
            margin-left: 190px;
            
          }

          #branchesDiv
          {
            position: absolute;
            bottom: 0;
            right:0;
            width: 400px;
            height : 250px;
            
          }

          #prsDiv
          {
            margin-left: 190px;
            position: absolute;
            bottom: 0;
            left:0;
            width: 400px;
            height : 250px;
            
          }

          canvas {
            border: 1px solid black;
            box-shadow: 5px 5px #e1e4e8;
            height: 250px;
            width:400px;
            border-radius : 10px;
          }

        
          

        `
        //The final tag
        let css = document.createElement('style')
        css.innerHTML = innerStyle

        //Inserting the tag into the head
        let head =  document.getElementsByTagName('head')
        head[0].appendChild(css)  
    }

    const innerScreen = 
        `    
        <div id="gbdScreen">
            <div id="gbdSidebar">
                <p>GitBreakDown</p>
                <a class="gbdMenu" href="#">Home</a>
                <a class="gbdMenu" href="#">Documentation</a>
                <a class="gbdMenu" href="#">About us</a>
            </div>
            <div class="flexContainer" id="charts">
                <div id="commitsDiv">
                    <canvas id="commitsDashboard"></canvas>
                </div>
                
                <div id="issuesDiv">
                    <canvas id="issuesDashboard"></canvas>   
                </div>
                <div id="prsDiv">
                    <canvas id="prsDashboard"></canvas>   
                </div>
                <div id="branchesDiv">
                    <canvas id="branchesDashboard"></canvas>   
                </div>
                
            </div>
        </div>
        `
    //revoming a black space between the navbar and the breakDown screen
    let pageHead = document.getElementsByClassName("pagehead repohead instapaper_ignore readability-menu experiment-repo-nav")
    let pageElement = pageHead[0]
    pageElement.style.marginBottom = "0px"
    //


    //inserting the screen inside gitHub
    let repoContent = document.getElementsByClassName('repository-content')
    let screen = document.createElement('div')
    screen.innerHTML = innerScreen
    if(document.getElementsByClassName('gbdButton').length == 0 && repoContent[0] !== undefined)
    {
        repoContent[0].parentNode.insertBefore(screen, repoContent[0])
        repoContent[0].parentNode.removeChild(repoContent[0])
        addCss()

        // sending messages to background.js to receive back fetched API data
        if (typeof chrome.app.isInstalled !== 'undefined')
        {
            chrome.runtime.sendMessage({metric: "issues"}, function(response) 
            {
                if (response.issues !== undefined)
                {
                    let issuesCtx = document.getElementById('issuesDashboard').getContext('2d')
                    createIssuesChart(response.issues, issuesCtx)
                }
            })
            chrome.runtime.sendMessage({metric: "commits"}, function(response) 
            {
                if (response.commits !== undefined)
                {
                    let commitCtx = document.getElementById('commitsDashboard').getContext('2d')
                    createCommitsChart(response.commits, commitCtx)
                }
            })
            chrome.runtime.sendMessage({metric: "branches"}, function(response) 
            {
                if (response.branches !== undefined)
                {
                    let branchesCtx = document.getElementById('branchesDashboard').getContext('2d')
                    createBranchesChart(response.branches, branchesCtx)
                }
            })
            chrome.runtime.sendMessage({metric: "pullrequests"}, function(response) 
            {
                if (response.pullrequests !== undefined)
                {
                    let prCtx = document.getElementById('prsDashboard').getContext('2d')
                    createPRChart(response.pullrequests, prCtx)
                }
            })
        }
    }
    
}



const gbdButtonOnClick = () => 
{
    const gbdtab = document.getElementById('gbdButton')
    if (gbdtab !== null)
    {
      gbdtab.addEventListener('click', gbdScreen)
    }
}

const zenhubOnClick = () =>
{
    const zhTab = document.getElementsByClassName("reponav-item zh-sidebar-item zh-navbar-link zh-topbar-item selected")[0]
    if (zhTab !== null && zhTab !== undefined)
    {
        zhTab.addEventListener('click', function()
        {
          document.getElementById('gbdButton').classList.remove('gbdselected')
        })
    }
}

const update = () =>	
{	
    let observer = new MutationObserver( () => 	
    {   	
        zenhubOnClick()
        if(document.getElementById('gbdButton') !== null)	
        {   		
            gbdButtonOnClick()	
        }
    })	

    observer.observe(document, {	
        subtree: true,	
        childList: true	
    })	
}


gbdButtonOnClick()
update()