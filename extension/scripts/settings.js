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
                title: '<h1 class="display-4">Settings page</h1>',
                content: $("#settingsContent").remove().html()
            }
        )
    }
}