function commitsPage(){

    let commitPage = 
    `
        <div class="container-fluid">
            <div class="row">
                <div class="col">
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
                <div class="col">
                    <div class="row">
                        <div class="card text-white bg-dark mb-3">
                            
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="card text-white bg-dark mb-3">
                            <canvas id="commitsTimeDashboard"></canvas>   
                        </div>
                    </div>
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
                        label: '# of issues',
                        fontColor: 'white',
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
                        fontSize: 12,
                        fontColor: 'white',
                        display: true,
                        text: 'Commits per sprint dashboard'
                    },
                    scales: 
                    {
                        display: false
                        
                    },
                    legend: {
                        labels: {
                            fontColor: 'white',
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
