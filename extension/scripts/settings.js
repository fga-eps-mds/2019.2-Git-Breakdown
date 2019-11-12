function settingsOnClick()
{
    let button = document.getElementById("settingsButton")
    if (button !== undefined && button !== null)
    {
        console.log($('#settingsContent').html())
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