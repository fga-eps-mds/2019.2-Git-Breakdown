const gbdScreen = () => 
{
    //console.log("7")
    const addCss = () => 
    {
        let innerStyle = 
        `   
        * {
            margin:0px;
            padding:0px;
            font-family:sans-serif
          }
          
          #gbd-screen {
            border : 0.5px solid rgba(39, 31, 31, 0.5);
            position : relative;
            width : 1000px;
            height : 500px;
            
          }
          
          #gbd-sidebar {
            position: absolute;
            display: block;
            text-decoration: none;
            width : 30px;
            height : 100%;
            background:#151719;
            -webkit-transition :width 0.5s;
            transition : width 0.5s;
          }
          
          #gbd-sidebar:hover {
            width : 200px;
          }
          
          #gbd-sidebar a{
            text-decoration : none;
            display : block;
            list-style-type : none;
            color : rgba(230, 230, 230);
            text-align : center;
            border-bottom: 1px solid rgba(100, 100, 100,0.3);
            margin : 40px;
            overflow:hidden;
          }

          #gbd-sidebar p{
            color : rgba(230, 230, 230);
            overflow: hidden;
            margin : 45px;
          }

        `
        let css = document.createElement('style')
        css.innerHTML = innerStyle
        let head =  document.getElementsByTagName('head')
        head[0].appendChild(css)  
    }

    const innerScreen = 
        `    
        <div id="gbd-screen">
            <div id="gbd-sidebar">
                <p>GitBreakDown</p>
                <a href="#">home</a>
                <a href="#">About us</a>
                <a href="#">About the metris </a>
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

// event()
const gbdButtonOnClick = () => 
{
    //console.log("6-GdbButtonOnClick()")
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
            //console.log("update runnin")	
            gbdButtonOnClick()	
        }	
    })	

    //start to observe the DOM	
    observer.observe(document, {	
        subtree: true,	
        childList: true	
    })	
}


gbdButtonOnClick()
update()