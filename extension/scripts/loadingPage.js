function loadPage(){
    let loadPage = 
    `
    <div class="container-fluid">
        <div id="gbdScreen">
            <div class="container-fluid">
                <div class="progress">
                    <div class="progress-bar" id="gbdProgressBar" role="progressbar" style="width:0%"
                                aria-valumin="0" aria-valuemax="100">
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    return loadPage
}


function plotProgress(size){
    let progressBar = document.getElementById('gbdProgressBar')
    progressBar.style.width = `${size}%`     
}