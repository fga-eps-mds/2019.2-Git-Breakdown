function gbdScreen()
{
    let urlLogo = chrome.extension.getURL("images/logo.jpg")
    let urlCog = chrome.extension.getURL("images/cog-8x.png")
    let gbdScreen = 
    `
    <div class="container-fluid">    
    <div id="gbdScreen">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="box-shadow: 1px 1px 1px 1px black;
        border-radius: 20px;">

            <a class="navbar-brand" href="#breakdown"><img src="${urlLogo}" width="30" height="30" class="d-inline-block align-top"> GitBreakdown</a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a id="gbdHomeBtn" class="nav-link" href="#breakdown">Home</a>
                </li>

                <li class="nav-item dropdown active">
                    
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Metrics
                    </a>

                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#breakdown/commits">Commits</a>
                        <a class="dropdown-item" href="#breakdown/issues">Issues</a>
                        <a class="dropdown-item" href="#breakdown/branches">Branches</a>
                        <a class="dropdown-item" href="#breakdown/pr">Pull Request</a>
                    </div>

                </li>

                </ul>


                
                <div id="settingsContent" class="hide">
                    <ul class="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                        <li class="active"><a class="nav-item nav-link active" id="nav-time-tab" data-toggle="tab" href="#time" role="tab">Time</a></li>
                        <li class="tab"><a class="nav-item nav-link" id="nav-metrics-tab" data-toggle="tab" href="#metrics" role="tab">Metrics</a></li>
                    </ul>
                    

                    <div class="tab-content">
                        <div class="tab-pane active" id="time">
                            <form>
                                <label for="SprintLength">Sprint length in days: </label>
                                <input type="number" name="SprintLength" id="sprintLength" min="1" max="10">
                            </form>
                        </div>

                        <div class="tab-pane" id="metrics">
                            <form>
                                <label for="commitsWeight">Commits weigth: </label>
                                <input type="number" name="commitsWeight" id="commitsWeight" min="1" max="10">
                            </form>
                        </div>
                    </div>
                </div>



                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <button type="button" class="btn btn-outline-info" id="settingsButton" data-toggle="popover">
                            <img src="${urlCog}" width="30" height="30" class="d-inline-block align-top">
                        </button>
                    </li>
                </ul>

            </div>
        </nav>

        <div class="gbdContent">
        <div class="row">



        <div class="col">
        <table class="table table-striped table-dark ranking">
            <thead>
                <tr>
                <th scope="col">Rank</th>
                <th scope="col">User</th>
                <th scope="col">Score</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>pxpc2</td>
                <td>2000</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>wdvictor</td>
                <td>420</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>baea</td>
                <td>120</td>
            </tr>
            </tbody>
        </table>
        </div>



        <div class="col">

            <div class="row">

                <div class="col-sm-6">
                    <div class="card text-white bg-dark mb-3">
                    <div class="card-body">
                        <canvas id="issuesDashboard"></canvas>   
                    </div>
                    </div>
                </div>

                <div class="col-sm-6">
                    <div class="card text-white bg-dark mb-3 right">
                    <div class="card-body">
                        <canvas id="commitsDashboard"></canvas>
                    </div>
                    </div>
                </div>

            </div>

            <div class="row">
                <div class="col-sm-6">
                    <div class="card text-white bg-dark mb-3">
                    <div class="card-body">
                        <canvas id="branchesDashboard"></canvas> 
                    </div>
                    </div>
                </div>

                <div class="col-sm-6">
                    <div class="card text-white bg-dark mb-3 right">
                    <div class="card-body">
                        <canvas id="prsDashboard"></canvas>   
                    </div>
                    </div>
                </div>
            </div>

        </div>
        </div>


        </div>
    </div>
    </div>
    `
    return gbdScreen
}