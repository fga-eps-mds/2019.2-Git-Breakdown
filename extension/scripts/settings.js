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
                content: function()
                {
                    return $("#settingsContent").html()
                }
            }
        )
    }
}