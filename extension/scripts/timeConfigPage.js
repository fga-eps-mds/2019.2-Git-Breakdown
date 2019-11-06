function timeConfigPage(){
    let timeConfigPage =  document.createElement('div')
    timeConfigPage.id = "configPage"
    timeConfigPage.innerHTML = 
    `
        <input name="sprintRange" type="number" min="1" max="10"
        id="sprintRange">
        <label for="sprintRange">SprintRange<label>

    `
    return timeConfigPage
}
