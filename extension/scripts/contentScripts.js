
//a first code to implement the tab( along side with code, issues and etc) of the
//git breakDown tab


const breakdownTAB = () =>{

    const content = document.getElementsByClassName('hx_reponav reponav js-repo-nav js-sidenav-container-pjax container zh-attached')
    var tab = document.createElement('div')
    var tab_link = document.createElement('a')
    tab_link.innerHTML = 'Gitbreakdown'
    tab.appendChild(tab_link)
    content[0].appendChild(tab)

}

breakdownTAB()