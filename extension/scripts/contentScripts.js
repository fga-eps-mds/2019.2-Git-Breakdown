
const buttonGbd = () => { 
    var tab = document.createElement('div')
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
            <a href="#breakdown" style=" color: #586069; text-decoration: none; ">
                <span class="span" style="text-align:center;">
                    BreakDown
                </span>
            </a>
        `

    return tab
}

const gdb = () => {
    const gitNavBar = document.getElementsByClassName('hx_reponav reponav js-repo-nav js-sidenav-container-pjax container zh-attached')
    gitNavBar[0].appendChild(buttonGbd())
 
}

const getBody = () => {
    const body = document.querySelectorAll('body')
    console.log(body)
    return body
}

const body = getBody()

if(body.length != 0){
   body.addEventListener('change', gdb())
   console.log('body found')
}