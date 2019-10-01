import constants from './constants.js'

const url_base_issues = 'http://54.159.51.170:3000/issues'
const url_aux = '?owner=fga-eps-mds&repository=2019.2-Git-Breakdown'

fetch(url_base_issues+url_aux).then((resp) => resp.json()).then(function(data)
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
                text: 'Issues state chart'
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
    console.log("erro = ")
})