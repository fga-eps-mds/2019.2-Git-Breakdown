let url_base = 'http://18.215.242.203:3000'




const homeBtn = () => {
   let homeBtn = document.getElementById('gbdHomeBtn')
   homeBtn.addEventListener('click', () => {
       document.getElementsByClassName('gbdContent')[0].innerHTML = gbdScreen()
    })
}



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

          .gbdContent {
              position: relative;
              widht : 100%;
              height: 80%;
              top:10%;
          }
          
          #gbdNavBar {
           overflow: hidden;
           background-color : #24292e;
          }
          
          #gbdNavBar a {
              float: left;
              font-size: 16px;
              color: white;
              text-align: center;
              padding : 14px 16px;
              text-decoration: none;
          }

          .subNav {
              float : left;
              overflow: hidden;
          }
          
          .subNav .subNavBtn {
              font-size: 16px;
              border: none;
              outline: none;
              color: white;
              padding: 14px 16px;
              background-color : inherit;
              font-family: inherit;
              margin: 0;
          }

          .gbdNavBar a:hover , .subNav:hover .subNavBtn {
              blackground-color: red;
          }

          .subNavContent {
              display: none;
              position: absolute;
              left: 0;
              background-color : red;
              width: 100%;
              z-index: 1;
          }

          .subNavContent a {
              float : left;
              color: white;
              text-decoration: none;
          }

          .subNav:hover .subNavContent {
              display: block;
          }
          


          .reponav-item.gbdselected {
              color:#24292e;
              background-color:#fff;
              border-color:
              rgba(0,51,102,0.7) #e1e4e8 transparent;
            }

    
          .flexContainer
            {
                position: relative;
                width: 50%;
                height: 100%;
                left : 50%;
            }

 
            .chartjs-render-monitor {
                position: absolute;
                border: 1px solid black;
                box-shadow: 5px 5px #e1e4e8;
                border-radius : 10px;
            }
            

            #commitsDashboard {
                top: 0;
                right: 0;
                display: block;
                width: 50% !important;
                height: 50% !important;
            }

            #issuesDashboard {
                top: 0;
                left: 0;
                display: block;
                width: 50% !important;
                height: 50% !important;
            }

            #prsDashboard {
                bottom: 0;
                right: 0;
                display: block;
                width: 50% !important;
                height: 50% !important;
            }

            #branchesDashboard {
                bottom: 0;
                left: 0;
                display: block;
                width: 50% !important;
                height: 50% !important;
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
            <div id="gbdNavBar">
                <a id="gbdHomeBtn" href="#breakdown">Home</a>
                <div class="subNav">
                    <button class="subNavBtn">Metrics</button>
                    <div class="subNavContent">
                        <a href="#breakdown/Commits">Commits</a>
                        <a href="#breakdown/Issues">Issues</a>
                        <a href="#breakdown/Branchs">Branchs</a>
                        <a href="#breakdown/PR">Pull Request</a>
                    </div>
                </div>
            </div>
            <div class="gbdContent">
                <div class="flexContainer">
                    <canvas id="commitsDashboard"></canvas>
                    <canvas id="issuesDashboard"></canvas>   
                    <canvas id="prsDashboard"></canvas>   
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
    
    //make MainContainer use 100% of the screen size
    let mainContainer = document.getElementsByClassName('container-lg clearfix new-discussion-timeline experiment-repo-nav  px-3')
    mainContainer[0].innerHTML = addScreen()
    mainContainer[0].style.maxWidth = "100%"
   
    addCss()
    homeBtn()

    
    if (typeof chrome.app.isInstalled !== 'undefined')
    {
        console.log("gbdScreen sending requests")
        chrome.runtime.sendMessage({metric: "get-metrics"}, function(response) 
        {
                if (response !== undefined)
                {
                    let screen = document.getElementById('gbdScreen')
                    screen.className = 'plotted'

                    let issuesCtx = document.getElementById('issuesDashboard').getContext('2d')
                    createIssuesChart(response[1], issuesCtx)
                    
                    let commitCtx = document.getElementById('commitsDashboard').getContext('2d')
                    createCommitsChart(response[0], commitCtx)

                    let branchesCtx = document.getElementById('branchesDashboard').getContext('2d')
                    createBranchesChart(response[2], branchesCtx)

                    let prCtx = document.getElementById('prsDashboard').getContext('2d')
                    createPRChart(response[3], prCtx)
                }
                else{
                    console.log("gbdScreen-else")
                    document.getElementById('gbdButton').click()
                }                   
                
        })
    }


    
}





const issuesPage = () => {
    let issuesPage = 
    `   
        <h2>Issues</h2>
        <div>Issues Opened : </div>
        <div>Issues Closed : 23</div>
        <div>Top issues Creater: Wdvictor</div>

    `
    return issuesPage;

}





//change all this function to work better with the new gbdContent Tag
window.onhashchange = function()
{
    let gbdButton = document.getElementById('gbdButton')
    if (gbdButton !== this.undefined)
    {
        if (window.location.href.includes("#breakdown/Issues"))
        {
            console.log('work')
            document.getElementsByClassName('gbdContent')[0].innerHTML = issuesPage()
        }
        else if(window.location.href.includes("#breakdown"))
        {
            console.log("showing breakdown screen")
            let screen = document.getElementById('gbdScreen')
            if (screen != null)
                console.log("already plotted")
            else
                gbdScreen()
            
        }
        else
        {
            if (gbdButton.className == 'js-selected-navigation-item gbdselected reponav-item')
            {
                console.log("removing selection from gbd button")
                gbdButton.classList.remove('gbdselected')
            }
        }
    }
}

// TODO: arrumar este listener para nao disparar junto da mudança na url #breakdown
// por enquanto deixamos ele desativado, a aba só abre com a mudança na url
const gbdButtonOnClick = () => 
{
    const gbdtab = document.getElementById('gbdButton')
    if (gbdtab !== null)
    {
        //gbdtab.addEventListener('click', gbdScreen)
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
