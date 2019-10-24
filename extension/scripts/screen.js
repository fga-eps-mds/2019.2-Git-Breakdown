const gbdScreen = () => 
{
    const addCss = () => 
    {
        let innerStyle = 
        `   
        * {
            margin:0px;
            padding:0px;
            font-family:sans-serif
          }
          
          #gbdScreen {
            border : 0.5px solid rgba(39, 31, 31, 0.5);
            position : relative;
            width : 1000px;
            height : 500px;
            
          }
          
          #gbdSidebar {
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
        let css = document.createElement('style')
        css.innerHTML = innerStyle
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

    const repoContent = document.getElementsByClassName('repository-content')
    const screen = document.createElement('div')
    screen.innerHTML = innerScreen
    if(document.getElementsByClassName('gbd-screen').length == 0 && repoContent !== undefined)
    {
        repoContent[0].parentNode.insertBefore(screen, repoContent[0])
        repoContent[0].parentNode.removeChild(repoContent[0])
        addCss()
    }

    
}


const gbdButtonOnClick = () => 
{
    const gbdtab = document.getElementById('gbd-button')
    if (gbdtab !== null)
      gbdtab.addEventListener('click', gbdScreen)
}

const update = () =>	
{	
    let observer = new MutationObserver( () => 	
    {   	
        if(document.getElementById('gbd-button') !== null)	
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