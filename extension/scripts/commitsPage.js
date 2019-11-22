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
                <div class="col-sm-8">
                    <div class="row">
                        <canvas id="commitsTimeDashboard"></canvas>   
                    </div>
                </div>
                </div>
            </div>
            <div class="row">
                <div class="jumbotron vertical-center">
                    <h1 class="display-4">Hello, world!</h1>
                    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr class="my-4">
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                </div>
            </div>
        </div> 
    `
    return commitPage
}

function plotCommitsChart()
{
    let ctx = document.getElementById('commitsTimeDashboard').getContext('2d')
    if (ctx !== undefined)
    {
        const chart = new Chart(ctx, 
            {
                type: 'line',
                data: 
                {
                    labels: ['sprint 1', 'sprint 2', 'sprint 3', 'sprint 4', 'sprint 5'],
                    datasets: 
                    [{
                        label: 'total of commits per sprint',
                        fontColor: 'black',
                        data: [5, 2, 4, 7, 10],
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


function plotCommiters()
{
    let table = document.getElementById("commitsRanking")
    let tbody = document.createElement('tbody')

    tbody.id = 'commitsRankingTbody'
    try
    {
        for(let i = 0; i < commitsData.length; i++)
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
    }
    catch (err)
    {
        console.log(err)
    }   
}
