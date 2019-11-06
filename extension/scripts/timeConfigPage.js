function timeConfigPage(){
    let timeConfigPage =  document.createElement('div')
    timeConfigPage.id = "configPage"
    timeConfigPage.innerHTML = 
    `
        <input name="spritRange" type="number" min="1" max="10"
        id="sprintRange">
        <label for="sprintRange">SprintRage<label>

    `
    return timeConfigPage
}
