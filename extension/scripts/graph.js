let url_base = 'http://18.215.242.203:3000'

export function createCommitsChart(url_aux, repo_name)
{
    let url_commits = url_base + '/commits' + url_aux
    fetch(url_commits).then((resp) => resp.json()).then(function(data)
    {
        console.log(JSON.stringify(data))
    }).catch(function()
    { 
        console.log("URL commits = " + url_commits)
    })
}

export function createBranchesChart(url_aux, repo_name)
{
    let url_branches = url_base + '/branches' + url_aux
    fetch(url_branches).then((resp) => resp.json()).then(function(data)
    {
        let qtMerged = Math.round((data.active_branches * data.percentage_merged) / (100 - data.percentage_merged))
        const ctx = document.getElementById('branchesDashboard').getContext('2d')
        const branchesChart = new Chart(ctx, 
        {
            type: 'pie',
            data: 
            {
                labels: ['Active', 'Merged'],
                datasets: 
                [{
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
                title:
                {
                    display: true,
                    text: 'Branches dashboard for repository: ' + repo_name
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
        console.log("URL branches = " + url_branches)
    })
}

export function createPRChart(url_aux, repo_name)
{
    let url_pr = url_base + '/pullrequests' + url_aux
    fetch(url_pr).then((resp) => resp.json()).then(function(data)
    {
        let total_refused = Math.round((data.refused_percent * data.closed)/100)
        let total_accepted = (data.closed - total_refused)
        console.log(total_refused)
        const ctx = document.getElementById('prsDashboard').getContext('2d')
        const prChart = new Chart(ctx, 
        {
            type: 'pie',
            data: 
            {
                labels: ['Open', 'Merged', 'Refused'],
                datasets: 
                [{
                    label: '# of pullrequests',
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
                title:
                {
                    display: true,
                    text: 'Pull Requests dashboard for repository: ' + repo_name
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
        console.log("URL PR = " + url_pr)
    })
}

export function createIssuesChart(url_aux, repo_name)
{
    let url_issues = url_base + '/issues' + url_aux
    fetch(url_issues).then((resp) => resp.json()).then(function(data)
    {
        const ctx = document.getElementById('issuesDashboard').getContext('2d')
        const issueChart = new Chart(ctx, 
        {
            type: 'pie',
            data: 
            {
                labels: ['Open', 'Closed'],
                datasets: 
                [{
                    label: '# of issues',
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
                title:
                {
                    display: true,
                    text: 'Issues dashboard for repository: ' + repo_name
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