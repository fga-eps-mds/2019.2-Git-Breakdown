function settingsOnClick()
{
    let button = document.getElementById("settingsButton")
    if (button !== undefined && button !== null)
    {
        $('#settingsButton').popover(
            {
                trigger: 'click',
                sanitize: false,
                selector: true,
                html: true,
                title: '<h1 class="display-4">Settings</h1>',
                content: $("#settingsContent").remove().html()
            }
            
        )
        $(document).mouseup(function (e)
        {
            let container = $(".popover")
    
            if (!container.is(e.target)
                && container.has(e.target).length === 0) 
            {
                container.popover("hide")
            }
        })   
    }
}