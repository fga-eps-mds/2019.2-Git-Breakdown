function zhplugin()
{
    let zenhub_selected = document.getElementsByClassName('reponav-item zh-sidebar-item zh-navbar-link zh-topbar-item selected')
    if (zenhub_selected[0] !== undefined)
        zenhub_selected[0].classList.remove('selected')
}

function zenhubOnClick()
{
    const zhTab = document.getElementsByClassName("reponav-item zh-sidebar-item zh-navbar-link zh-topbar-item selected")[0]
    if (zhTab !== undefined)
    {
        zhTab.addEventListener('click', function()
        {
            document.getElementById('gbdButton').classList.remove('gbdselected')
        })
    }
}