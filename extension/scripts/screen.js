const gbdScreen = () => 
{
    let gbdtab = document.getElementById('gbdButton')
    let current_selected = document.getElementsByClassName('js-selected-navigation-item selected reponav-item')
    current_selected[0].classList.remove('selected')
    gbdtab.className = 'js-selected-navigation-item selected reponav-item'
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
            border-radius : 25px;
            position: absolute;
            display: block;
            text-decoration: none;
            width : 50px;
            height : 100%;
            background:#151719;
            -webkit-transition :all 0.5s;
            transition : all 0.5s;
          }
          
          #gbdSidebar:hover{
            width : 200px;
          }
          
          #gbdSidebar a{
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

          .gbdMenu:hover{
            margin : 0px;
            color : rgba(105, 107, 108, 1);
            border-bottom : 1px solid rgba(105, 107, 108, 1);
          }

          #gbdSidebar p{
            text-align : center;
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
                <a class="gbdMenu" href="#">home</a>
                <a class="gbdMenu" href="#">Details</a>
                <a class="gbdMenu" href="#">About us</a>
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
    }
    //
    
}


const gbdButtonOnClick = () => 
{
    const gbdtab = document.getElementById('gbdButton')
    if (gbdtab !== null)
    {
      gbdtab.addEventListener('click', gbdScreen)
    }
}

const update = () =>	
{	
    let observer = new MutationObserver( () => 	
    {   	
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