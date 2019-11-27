function commitsPage(){

    let commitPage = 
    `
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-4">
                    <div class="table-responsive">
                    <table class="table table-hover table-dark" id="commitsRanking">
                        <thead>
                            <tr>
                                <th scope="col">User</th>
                                <th scope="col">Total of commits</th>
                            </tr>
                        </thead>
                    </table>
                    </div>
                </div>
                <div class="col-sm-8" id="timechartdiv">
                    <canvas id="commitsTimeDashboard"></canvas>   
                </div>
                </div>
            </div>
            <div class="row" id="commits_info_row">
                
            </div>
            </div>
        </div> 
    `
    return commitPage
}

function getLabels()
{
    let pos = (commitsData.length - 4)
    let labels = []
    for (let i = 0; i < commitsData[pos].length; i++)
    {
        labels.push(`Sprint ${commitsData[pos][i].sprint} from ${commitsData[pos][i].starting_date} to ${commitsData[pos][i].ending_date}`)
    }
    return labels
}

function getData()
{
    let pos = (commitsData.length - 4)
    let data = []
    for (let i = 0; i < commitsData[pos].length; i++)
    {
        data.push(commitsData[pos][i].commits)
    }
    return data
}

function plotCommitsChart()
{
    console.log(commitsData)
    let labels = getLabels()
    let data = getData()
    console.log(labels)
    let ctx = document.getElementById('commitsTimeDashboard').getContext('2d')
    if (ctx !== undefined)
    {
        const chart = new Chart(ctx, 
            {
                type: 'line',
                data: 
                {
                    labels: labels,
                    datasets: 
                    [{
                        label: 'total of commits per sprint',
                        fontColor: 'black',
                        data: data,
                        backgroundColor: 
                        [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 99, 132, 0.6)'
                        ],
                        fill: false,
                        borderColor: 
                        [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: 
                {
                    tooltips:
                    {
                        titleFontSize: 12,
                        bodyFontSize: 12
                    },
                    maintainAspectRatio: false,
                    title:
                    {
                        fontSize: 15,
                        fontColor: 'black',
                        display: true,
                        text: 'Commits per sprint dashboard'
                    },
                    scales: 
                    {
                        display: false
                        
                    },
                    legend: {
                        labels: {
                            fontColor: 'black',
                            fontSize: 12
                        }
                    }
                }
            })
    }
}

function plotCommitsInfo()
{
    let count = 0
    for (let i = 0; i < commitsData.length-4; i++)
    {
        count += commitsData[i].commits
    }
    let row = document.getElementById('commits_info_row')
    row.innerHTML =
    `
    <div class="col-sm-6" id="jumbo-col">
                    <div class="jumbotron" id="commitsDetails">
                        <h1 class="display-4 text-center">Commits by sprint</h1>
                        <p class="lead text-center ">Based on the configurations settings for sprints, the following information was calculated:</p>
                        <hr class="my-4">
                        <div class="row">
                            <div class="col-sm-4">
                                <p class="font-weight-bold text-center">A total of ${count} commits have been pushed.</p>
                            </div>
                            <div class="col-sm-4">
                                <p class="font-weight-bold text-center">There is a total of ${commitsData[commitsData.length-4].length} sprints.</p>
                            </div>
                            <div class="col-sm-4">
                                <p class="font-weight-bold text-center">The average number of commits per sprint is ${(commitsData[commitsData.length-1].average_commits).toFixed(2)}.</p>
                            </div>
                        </div>
                        <hr class="my-4">   
                        <div class="row">
                            <div class="col-sm-6">
                                <p class="font-weight-bold text-center">The best sprint is Sprint ${commitsData[commitsData.length-3].sprint} with a total of ${commitsData[commitsData.length-3].commits} commits.</p>
                                <p class="font-weight-bold text-center">That's a productivity of ${((commitsData[commitsData.length-3].percentage_of_average)*100).toFixed(2)}% compared to the average.</p>
                            </div>
                            <div class="col-sm-6">
                                <p class="font-weight-bold text-center">The worst sprint is Sprint ${commitsData[commitsData.length-2].sprint} with a total of ${commitsData[commitsData.length-2].commits} commits.</p>
                                <p class="font-weight-bold text-center">That's a productivity of ${((commitsData[commitsData.length-2].percentage_of_average)*100).toFixed(2)}% compared to the average.</p>
                            </div>
                        </div>
                    </div>
    `

}


function plotCommiters()
{
    let table = document.getElementById("commitsRanking")
    let tbody = document.createElement('tbody')

    tbody.id = 'commitsRankingTbody'
    try
    {
        if (commitsData !== undefined)
        {
            for(let i = 0; i < commitsData.length-4; i++)
            {
                if (commitsData[i] != undefined)
                {
                    let member = commitsData[i].name
                    let memberTotalCommits = commitsData[i].commits
                    let tr = document.createElement('tr')
                    tr.innerHTML = 
                        `
                            <th scope="row">${member}</th>
                            <td>${memberTotalCommits}</td>
                        `
                    tbody.appendChild(tr)
                }
            }
            table.appendChild(tbody)
            let table_height = $('#commitsRanking').height()
            console.log(table_height)
            document.getElementById('commitsTimeDashboard').style.setProperty('height', `${table_height}px`)
        }
    }
    catch (err)
    {
        console.log(err)
    }   
    plotCommitsInfo()
    plotCommitsChart()
}
