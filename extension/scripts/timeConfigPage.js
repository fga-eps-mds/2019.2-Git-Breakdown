function timeConfigPage(){
    let timeConfigPage =  document.createElement('div')
    timeConfigPage.id = "configPage"
    timeConfigPage.innerHTML = 
    `
        <input name="sprintLength" type="number" id="sprintLength" min="1" max="10"
        id="sprintLength">
        <label for="sprintLength">Sprint Length<label>
        <button id="submitButton">Save</button>
    `
    return timeConfigPage
}

// function that will get the data from the input and can be used by any other script
// when plotting time charts, we will call this function
function test(data)
{
    alert(data)
    return data
}

// event listener to listen to the time configuration
function timeConfigOnClick()
{
    let button = document.getElementById("submitButton")
    if (button !== undefined)
    {
      button.addEventListener('click', function()
      {
        let input = document.getElementById("sprintLength")
        if (input !== undefined)
          test(input.value) // so pra testar se o clique ta funfando
      })
    }
}