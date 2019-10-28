let url_base = 'http://18.215.242.203:3000'

const gbdScreen = () => 
{
    let issueResp , prResp, branchResp, commitResp

    // sending messages to background.js to receive back fetched API data
   
    
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
            position: relative;
            border-radius : 25px;
            box-shadow: 5px 5px #e1e4e8; 
            border-top : 0;
            border-bottom : 3px #e36209 #e1e4e8 transparent;
            border-right : 3px #e36209 #e1e4e8 transparent;
            width : 100%;
            height : 500px;
            left:0;
            
          }
          
          #gbdSidebar {
            font: inherit;
            border-radius : 25px;
            position: absolute;
            display: block;
            text-decoration: none;
            width : 5%;
            height : 100%;
            background-color:rgba(0,51,102,0.63);
            -webkit-transition :all 0.5s;
            transition : all 0.5s;
          }
          
          #gbdSidebar:hover{
            width : 20%;
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

          #gbdSidebar p{
            text-align : center;
            font-size: inherit;
            font-weight: 700;
            color : rgba(230, 230, 230);
            overflow: hidden;
            margin : 45px;
            border-bottom: 1px solid rgba(255, 137, 75, 0.42);
          }

          #gbdSidebar p:hover {
            border-bottom: 1px solid rgba(255, 137, 75, 0.42);
          }


          .reponav-item.gbdselected {
              color:#24292e;
              background-color:#fff;
              border-color:
              rgba(0,51,102,0.7) #e1e4e8 transparent;
            }

          .gbdMenu:hover{
            margin : 0px;
            color : rgba(105, 107, 108, 1);
            border-bottom : 1px solid rgba(105, 107, 108, 1);
          }

          
          .flexContainer
            {
                position: relative;
                width: 80%;
                height: 100%;
                left : 20%; 
               
            }

            .flexContainer div{
                position: absolute;
                width: 45%;
                height: 45%;
            }


            .flexContainer canvas {
                border: 1px solid black;
                box-shadow: 5px 5px #e1e4e8;
                border-radius : 10px;
            }

            #commitsDiv {
                top:5%;
                right:5%;
            }

            #issuesDiv {
                top:5%;
                left:5%;
            }

            #prsDiv {
                bottom:5%;
                left: 5%;
            }

            #branchesDiv {
                bottom:5%;
                right:5%;
            }

         
        
          

        `

         

        //The final tag
        let css = document.createElement('style')
        css.innerHTML = innerStyle

        //Inserting the tag into the head
        let head =  document.getElementsByTagName('head')
        head[0].appendChild(css)  
    }

    const addScreen = () => {
        innerScreen = 
        `    
        <div id="gbdScreen">
            <div id="gbdSidebar">
                <p>GitBreakDown</p>
                <a class="gbdMenu" href="#">Home</a>
                <a class="gbdMenu" href="#">Documentation</a>
                <a class="gbdMenu" href="#">About us</a>
            </div>
            <div class="flexContainer">
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
        return innerScreen
    }
    


    
    //revoming a black space between the navbar and the breakDown screen
    let pageHead = document.getElementsByClassName("pagehead repohead instapaper_ignore readability-menu experiment-repo-nav")
    let pageElement = pageHead[0]
    pageElement.style.marginBottom = "5px"
    //

    
    let mainContainer = document.getElementsByClassName('container-lg clearfix new-discussion-timeline experiment-repo-nav  px-3')
    mainContainer[0].innerHTML = addScreen()
    mainContainer[0].style.marginLeft = '0'
    addCss()

    console.log("gbdScreen")
    if (typeof chrome.app.isInstalled !== 'undefined')
    {
        chrome.runtime.sendMessage({metric: "issues"}, function(response) 
        {
            console.log('issue')
            setTimeout(function(){
               
                if (response.issues !== undefined)
                {
                    let issuesCtx = document.getElementById('issuesDashboard').getContext('2d')
                    createIssuesChart(response.issues, issuesCtx)
                }
                else{
                    console.log("gbdScreen-else")
                    document.getElementById('gbdButton').click()
                }                   
                
            }, 2000)

        })
        chrome.runtime.sendMessage({metric: "commits"}, function(response) 
        {
            console.log('commits')
            setTimeout(function(){
               
                if (response.commits !== undefined)
                {
                    let commitCtx = document.getElementById('commitsDashboard').getContext('2d')
                    createCommitsChart(response.commits, commitCtx)
                }
            }, 2000)
                
        })
        chrome.runtime.sendMessage({metric: "branches"}, function(response) 
        {
            console.log('branchs')
            setTimeout(function(){
                
                if(response.branches !== undefined)
                {
                    let branchesCtx = document.getElementById('branchesDashboard').getContext('2d')
                    createBranchesChart(response.branches, branchesCtx)
                }
            }, 2000)
                
        })
        chrome.runtime.sendMessage({metric: "pullrequests"}, function(response) 
        {
            console.log('PR')
            setTimeout(function(){
               
                if (response.pullrequests !== undefined)
                {
                    let prCtx = document.getElementById('prsDashboard').getContext('2d')
                    createPRChart(response.pullrequests, prCtx)
                }
            },2000)
                
        })
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