//Button routine: put the GBD button in the GH pages

const buttonGbd = () => { 
    var tab = document.createElement('span')
    //tab.id = "gbd-tab"
    tab.className = "position-relative float-left"
    tab.style.textAlign = "center"
    tab.style.paddingLeft = "12px"
    tab.style.paddingRight = "12px"
    tab.style.paddingTop = "7px"
    tab.style.paddingBottom = "8px"
    tab.style.borderTop = "3px"
    tab.style.borderLeft = "1px"
    tab.style.borderRight = "1px"
    tab.style.borderBottom = "1px"

    tab.innerHTML =  `
                <a href="#breakdown"  id="gbd-tab" style=" color: #586069; text-decoration: none; ">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="15px" height="15px" viewBox="0 0 16 16" content="&lt;mxfile host=&quot;www.draw.io&quot; modified=&quot;2019-10-03T05:50:23.373Z&quot; agent=&quot;Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36&quot; etag=&quot;hR2mcl4dNF6T8Xv4kp3t&quot; version=&quot;12.0.2&quot; type=&quot;device&quot; pages=&quot;1&quot;&gt;&lt;diagram id=&quot;CRaovy_yR8SBktJ2aGBF&quot; name=&quot;Page-1&quot;&gt;jZNfb+MgDMA/TR5b5c966muXW++k3bRJk7bHEwUa0BHMEXcl+/QzCWkaTZOWh2D/bLCxTVbVbfjlmVMPIKTJylyErPqZlWWZb+gfQT+C4sd2BI3XIqEZPOt3mWCe6EkL2S0cEcCgdkvIwVrJccGY93Beuh3BLKM61shP4Jkz85m+aoFqpNtNPvPfUjdqilzkydKyyTmBTjEB5ytU3WVV7QFwlNpQSxNrN9Vl3Lf/wnpJzEuL39lwL/v79/8vbqfsax2K01M43KyKm/GYN2ZO6cYpW+ynElDiLoq6HWp1q7A1pBYkvkmPmoq1M7qxxBDcFf3DDtI8QadRQ7QeABFacjDRcMv4v8bDyYoaDPghVnUcPnIZgu06N/Y0J8Im5aiDFJML6QoxDsMuXr3cc2GrtaZxOGorpF9ziljuBUNGS+RdWjVfUQ33VSwZV8zjX2ZwVZTbtbMNHY8y4KNjXGMc3U1MIdWKrifDl10oLr2lNyGhleh7cgnLue6X6nmerSK9GHU9VomxNM3N5dy54SSknk/qPFuD7eqBVncf&lt;/diagram&gt;&lt;/mxfile&gt;" style="background-color: rgb(255, 255, 255);"><defs/><g><image x="-0.5" y="1" width="15" height="15" xlink:href="https://cdn3.iconfinder.com/data/icons/iconic-1/32/chart_alt-128.png" preserveAspectRatio="none" pointer-events="none"/></g></svg>
                <span>BreakDown</span>
                </a>
        `
    return tab
}

const insertButton = () => {
    const gitNavBar = document.getElementsByTagName('nav')
    var navPatter = /.*(hx_reponav reponav)+.*/ 
    for(var i = 0 ; i < gitNavBar.length ; i++)
    {
        var className = gitNavBar[i].className
        var res = navPatter.exec(className)
        if (res != null)
            gitNavBar[i].appendChild(buttonGbd())       
    }

   
}

//This function deals to insert button in cases when the mutation event doesn't trigger
const init_ = () => {
    if(document.getElementById('gbd-tab') === null)
    {   
        insertButton()
        event()
    }
}

//the observer Method
const initGBD = () => {
    
    var observer = new MutationObserver( () => {   
        if(document.getElementById('gbd-tab') === null)
        {   
            insertButton()
            event()
        }
    })
  
    //start to observe the DOM
    observer.observe(document, {
        subtree: true,
        childList: true
    })

}

//On this function, change the class that we take from dom, take his first child
const gdbScreen = () => 
{
    console.log("gbd start")
    const repoContent = document.getElementsByClassName('repository-content')
    console.log(repoContent)
    // for(var i = 1 ; i < repoContent.length; i++)
    // {
    //     repoContent[i].parentNode.removeChild(div[i])
    // }

    const addGbdCss = () => {
        
    }

    const innerScreen = `
        <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500');
            body {
            overflow-x: hidden;
            font-family: 'Roboto', sans-serif;
            font-size: 16px;
            }

            /* Toggle Styles */

            #viewport {
            padding-left: 250px;
            -webkit-transition: all 0.5s ease;
            -moz-transition: all 0.5s ease;
            -o-transition: all 0.5s ease;
            transition: all 0.5s ease;
            }

            #content {
            width: 100%;
            position: relative;
            margin-right: 0;
            }

            /* Sidebar Styles */

            #sidebar {
            z-index: 1000;
            position: fixed;
            left: 250px;
            width: 250px;
            height: 100%;
            margin-left: -250px;
            overflow-y: auto;
            background: #37474F;
            -webkit-transition: all 0.5s ease;
            -moz-transition: all 0.5s ease;
            -o-transition: all 0.5s ease;
            transition: all 0.5s ease;
            }

            #sidebar header {
            background-color: #263238;
            font-size: 20px;
            line-height: 52px;
            text-align: center;
            }

            #sidebar header a {
            color: #fff;
            display: block;
            text-decoration: none;
            }

            #sidebar header a:hover {
            color: #fff;
            }

            #sidebar .nav{
            
            }

            #sidebar .nav a{
            background: none;
            border-bottom: 1px solid #455A64;
            color: #CFD8DC;
            font-size: 14px;
            padding: 16px 24px;
            }

            #sidebar .nav a:hover{
            background: none;
            color: #ECEFF1;
            }

            #sidebar .nav a i{
            margin-right: 16px;
            }
        </style>
            <div class="gbd-screen">
                <div class="sidebar-logo">
                    BreakDown
                </div>
                <ul class="sidebar-navigation">
                    <li class="header">Commits</li>
                        <li>
                            <a href="#">
                                <i class="fa fa-home" aria-hidden="true"></i> Issues
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="fa fa-tachometer" aria-hidden="true"></i> Pull Requests
                            </a>
                        </li>
                        <li class="header">Branchs</li>
                         <li>
                            <a href="#">
                                <i class="fa fa-users" aria-hidden="true"></i>GBD documentation
                            </a>
                        </li>
                    </ul>
                </div>

            <div class="content-container">
    `
    const gdbScreen = document.createElement('div')
    gdbScreen.innerHTML = innerScreen
    if(document.getElementsByClassName('gbd-screen').length == 0)
    {
        repoContent[0].parentNode.insertBefore(gdbScreen, repoContent[0])
        repoContent[0].parentNode.removeChild(repoContent[0])
    }
}

const event = () => 
{
    const gbdtab = document.getElementById('gbd-tab')
    gbdtab.addEventListener('click', gdbScreen)
}


init_()
initGBD()