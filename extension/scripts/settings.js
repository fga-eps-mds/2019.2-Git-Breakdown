function settingsOnClick()
{
    let button = document.getElementById("settingsButton")
    if (button !== undefined && button !== null)
    {
        $('#settingsButton').popover(
            {
                trigger: 'click',
                title: 'TITLE',
                html: true,
                content: '<h1> Conteudo </h1>'
            }
        )
    }
}