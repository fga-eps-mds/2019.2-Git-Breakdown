let url_base = 'http://18.215.242.203:3000'

export function createPRChart(url_aux)
{
    let url_pr = url_base + '/pullrequests' + url_aux
    fetch(url_pr).then((resp) => resp.json()).then(function(data)
    {
        console.log("PR data: " + data)
    }).catch(function()
    { 
        console.log("URL PR = " + url_pr)
    })
}

export function createIssuesChart(url_aux, repo_name)
{
    let url_issues = url_base + '/issues' + url_aux
    fetch(url_issues).then((resp) => resp.json()).then(function(data)
    {
        const ctx = document.getElementById('issueStatusChart').getContext('2d')
        const issueChart = new Chart(ctx, 
        {
            type: 'pie',
            data: 
            {
                labels: ['open', 'closed'],
                datasets: 
                [{
                    label: '# of issues',
                    data: [data.open, data.closed],
                    backgroundColor: 
                    [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)'
                    ],
                    borderColor: 
                    [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: 
            {
                title:
                {
                    display: true,
                    text: 'Issues chart for repository: ' + repo_name
                },
                scales: 
                {
                    yAxes: 
                    [{
                        ticks: 
                        {
                            beginAtZero: true
                        }
                    }]
                }
            }
        })
    }).catch(function()
    {
        console.log("URL ISSUE = " + url_issues)
    })
} 