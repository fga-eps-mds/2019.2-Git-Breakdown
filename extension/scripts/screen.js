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
            
          }
          
          #gbdSidebar {
            font: inherit;
            border-radius : 25px;
            position: absolute;
            display: block;
            text-decoration: none;
            width : 50px;
            height : 100%;
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

          #gbdSidebar p:hover{
            border-bottom: 1px solid rgba(255, 137, 75, 0.42);
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
            <canvas id="issuesDashboard" width="400" height="400"></canvas>
            <canvas id="prsDashboard" width="400" height="400"></canvas>
            <canvas id="branchesDashboard" width="400" height="400"></canvas>
            <canvas id="commitsDashboard" width="400" height="400"></canvas>
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

        chrome.storage.sync.get('oauth2_token', function(res) 
        {
            if (res.oauth2_token != undefined)
            {
                let url = window.location.href.split("/")
                let owner = url[3]
                let repo = url[4].split("#")[0]
                let url_aux = `?owner=${owner}&repository=${repo}&token=${res.oauth2_token}`
            }
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