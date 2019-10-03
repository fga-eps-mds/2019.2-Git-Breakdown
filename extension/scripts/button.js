//Button routine: put the GDB button in the GH pages
const buttonGbd = () => { 
    var tab = document.createElement('div')
    tab.className = "gdb-tab"
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
                <span style="text-align:center;">
                    BreakDown
                </span>
            </a>
        `

    return tab
}

const gdb = () => {
    const gitNavBar = document.getElementsByClassName('hx_reponav reponav js-repo-nav js-sidenav-container-pjax container zh-attached')
    if(gitNavBar.length != 0)
        gitNavBar[0].appendChild(buttonGbd())
}

const initGDB = () => {
    MutationObserver = window.MutationObserver
    var observer = new MutationObserver((mutations , observer) => {
    if(document.getElementsByClassName('gdb-tab').length == 0)
        gdb()
    
    })
    var mutations = observer.takeRecords()
    observer.observe(document, {
    subtree: true,
    childList: true
    })
}

initGDB()