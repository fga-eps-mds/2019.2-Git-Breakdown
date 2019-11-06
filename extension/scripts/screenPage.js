function gbdScreen()
{
    let gbdScreen = 
    `    
    <div id="gbdScreen">
        <div id="gbdNavBar">
            <a id="gbdHomeBtn" href="#breakdown">Home</a>
            <div class="subNav">
                <button class="subNavBtn">Metrics</button>
                <div class="subNavContent">
                    <a href="#breakdown/commits">Commits</a>
                    <a href="#breakdown/issues">Issues</a>
                    <a href="#breakdown/branches">Branches</a>
                    <a href="#breakdown/pr">Pull Request</a>
                </div>
            </div>
        </div>
        <div class="gbdContent">
            <div class="flexContainer">
                <canvas id="commitsDashboard"></canvas>
                <canvas id="issuesDashboard"></canvas>   
                <canvas id="prsDashboard"></canvas>   
                <canvas id="branchesDashboard"></canvas>       
            </div>
        </div>
    </div>
    `
    return gbdScreen
}