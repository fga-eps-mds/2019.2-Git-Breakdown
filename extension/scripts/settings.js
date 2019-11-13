function settingsOnClick()
{
    let button = document.getElementById("settingsButton")
    if (button !== undefined && button !== null)
    {
        let tabContent = $('#settingsContent').html()
        $('#settingsButton').popover(
            {
                trigger: 'click',
                sanitize: false,
                selector: true,
                html: true,
                content: $("#settingsContent").remove().html()
            }
        )
    }
}