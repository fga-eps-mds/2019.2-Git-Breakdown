
//a first code to implement the tab( along side with code, issues and etc) of the
//git breakDown tab


const breakdownTAB = () =>{

    const content = document.getElementsByClassName('hx_reponav reponav js-repo-nav js-sidenav-container-pjax container zh-attached')
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
        <a href="#breakdown" style="text-align:center;">
            <span class="span" style="text-align:center;">
                BreakDown
            </span>
        </a>
    `
    content[0].appendChild(tab)

}

breakdownTAB()