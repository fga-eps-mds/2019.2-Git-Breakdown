function timeConfigPage(){
    let timeConfigPage =  document.createElement('div')
    timeConfigPage.id = "configPage"
    timeConfigPage.innerHTML = 
    `
        <input type="range" min="1" max="20" value="1"
        id="weeksRange">
        <p>-:-<span id="weeekOutput"></span></p>

    `

    

    return timeConfigPage
}

function addRangeOutput(){
    
    let script = document.createElement('script')
    
    script.innerHTML = 
    `
    let weeksRange = document.getElementById("weeksRange")
    let output = document.getElementById("weeekOutput")
    alert(weeksRange , output)
    output.innerHTML = weeksRange.value

    weeksRange.oninput = function() {
        output.innerHTML = this.value
    }
    

    `

    document.getElementsByTagName('body')[0].appendChild(script)
}