



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
    const applicationMain = document.querySelector('.application-main ')
    var gitNavBarClassName = 'hx_reponav reponav js-repo-nav js-sidenav-container-pjax container zh-attached'
    const gitNavBar = document.getElementsByClassName(gitNavBarClassName)
    gitNavBar[0].appendChild(buttonGbd())
 
}

window.addEventListener('load', (event) => {
    gdb()

})













// const breakdownTAB = () =>{


//     const content = document.querySelector('.hx_reponav reponav js-repo-nav js-sidenav-container-pjax container zh-attached')
//     if(content.length != 0)
//     {
//         var tab = document.createElement('div')
//         tab.style.textAlign = "center"
//         tab.style.paddingLeft = "12px"
//         tab.style.paddingRight = "12px"
//         tab.style.paddingTop = "7px"
//         tab.style.paddingBottom = "8px"
//         tab.style.borderTop = "3px"
//         tab.style.borderLeft = "1px"
//         tab.style.borderRight = "1px"
//         tab.style.borderBottom = "1px"
//         tab.innerHTML =  `
//             <a href="#breakdown" style=" color: #586069; text-decoration: none; ">
//                 <span class="span" style="text-align:center;">
//                     BreakDown
//                 </span>
//             </a>
//         `
//         content[0].appendChild(tab)

//     }
   
// }

// breakdownTAB()