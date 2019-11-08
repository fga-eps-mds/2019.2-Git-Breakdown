function createCommitsChart(data, ctx)
{
    let size = Object.keys(data).length
    let names = []
    let qtCommits = []
    let colorArray = getRandomColorArray(size)
    for (let i = 0; i < size; i++)
    {
        if (data[i] != undefined)
        {
            names[i] = data[i].name
            qtCommits[i] = data[i].commits
        }
    }
    const commitsChart = new Chart(ctx, 
    {
        type: 'bar',
        data: 
        {
            fontColor: 'white',
            labels: names,
            datasets: 
            [{
                label: '# of commits per contributor',
                data: qtCommits,
                backgroundColor: colorArray,
                borderColor: colorArray,
                fontSize: 12,
                fontColor: 'white',
                borderWidth: 1
            }]
        },
        options: 
        {
            maintainAspectRatio: false,
            title:
            {
                fontSize: 12,
                fontColor: 'white',
                display: true,
                text: 'Commits per person dashboard'
            },
            tooltips:
            {
                titleFontSize: 12,
                bodyFontSize: 12
            },
            scales: 
            {
                yAxes: 
                [{
                    gridLines: 
                    {
                        display: false
                    }
                }],
                xAxes: 
                [{
                    ticks: {
                        fontColor: 'white',
                        fontSize: 12
                    },
                    gridLines: 
                    {
                        display: false
                    }
                }]
            },
            legend: {
                labels: {
                    fontSize: 12,
                    fontColor: 'white'
                }
            }
        }
    })
}

function createBranchesChart(data, ctx)
{
    let qtMerged = Math.round((data.active_branches * data.percentage_merged) / (100 - data.percentage_merged))
    const branchesChart = new Chart(ctx, 
    {
        type: 'pie',
        data: 
        {
            labels: ['Active', 'Merged'],
            datasets: 
            [{
                fontColor: 'white',
                label: '# of branches',
                data: [data.active_branches, qtMerged],
                backgroundColor: 
                [
                    'rgba(64, 174, 237, 0.6)',
                    'rgba(57, 66, 255, 0.6)'
                ],
                borderColor: 
                [
                    'rgba(110, 110, 110, 1)',
                    'rgba(110, 110, 110, 1)'
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
            legend: {
                labels: {
                    fontColor: 'white',
                    fontSize: 12
                }
            },
            maintainAspectRatio: false,
            title:
            {
                fontSize: 12,
                fontColor: 'white',
                display: true,
                text: 'Branches dashboard'
            },
            scales: 
            {
                ticks: 
                {
                    display: false
                }
            }
        }
    })

}

function createPRChart(data, ctx)
{
    let total_refused = Math.round((data.refused_percent * data.closed)/100)
    let total_accepted = (data.closed - total_refused)
    const prChart = new Chart(ctx, 
    {
        type: 'pie',
        data: 
        {
            labels: ['Open', 'Merged', 'Refused'],
            datasets: 
            [{
                label: '# of pullrequests',
                fontColor: 'white',
                data: [data.open, total_accepted, total_refused],
                backgroundColor: 
                [
                    'rgba(5, 204, 0, 0.6)',
                    'rgba(57, 66, 255, 0.6)',
                    'rgba(255, 0, 0, 0.6)'
                ],
                borderColor: 
                [
                    'rgba(110, 110, 110, 1)',
                    'rgba(110, 110, 110, 1)',
                    'rgba(110, 110, 110, 1)'
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
            legend: {
                labels: {
                    fontColor: 'white',
                    fontSize: 12
                }
            },
            maintainAspectRatio: false,
            title:
            {
                fontSize: 12,
                fontColor: 'white',
                display: true,
                text: 'Pull Requests dashboard'
            },
            scales: 
            {
                ticks: 
                {
                    display: false
                }
            }
        }
    })
}

function createIssuesChart(data, ctx)
{
    const issueChart = new Chart(ctx, 
    {
        type: 'pie',
        data: 
        {
            labels: ['Open', 'Closed'],
            datasets: 
            [{
                label: '# of issues',
                fontColor: 'white',
                data: [data.open, data.closed],
                backgroundColor: 
                [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)'
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
                text: 'Issues dashboard'
            },
            scales: 
            {
                ticks: 
                {
                    display: false
                }
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

function getRandomColorArray(arraySize)
{
    let colorArray = []
    for (let i = 0; i < arraySize; i++)
    {
        const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
        const randomByte = () => randomNumber(0, 255)
        const randomPercent = () => (randomNumber(50, 100) * 0.01).toFixed(2)
        const randomCssRgba = `rgba(${[randomByte(), randomByte(), randomByte(), randomPercent()].join(', ')})`
            colorArray[i] = randomCssRgba
    }
    return colorArray
}