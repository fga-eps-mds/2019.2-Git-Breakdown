
function settingsOnClick()
{
    let button = document.getElementById("settingsButton")
    if (button !== undefined && button !== null)
    {
        let saveButton = document.getElementById("settingsSave")
        if (saveButton !== undefined && saveButton !== null)
        {
            saveButton.addEventListener('click', function()
            {
                let input = document.getElementById('sprintLength').value
                alert(input) // TODO: colocar este dado dentro de uma variável acessível pelas metric pages
                $('#settingsModal').modal('toggle');
            })
        }
    }
}

// event listener to listen to the time configuration
function timeConfigOnClick(){
    try{
        let button = document.getElementById("btnOk")
        if (button !== undefined){
        button.addEventListener('click', function(){
            let input = document.getElementById("SprintSize")
            if (input !== undefined)
            test(input.value) // so pra testar se o clique ta funfando
        })
        }
    }catch (err){
        console.log("GBD error:", err)
    }
}