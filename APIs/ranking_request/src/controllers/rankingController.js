const axios = require("axios")

const urlCommits = "http://commit_api:3001/commits"
const urlIssues = "http://issue_api:3002/issues/ranking"
const urlPullrequests = "http://pullrequest_api:3003/pullrequests/ranking"

let commitsWeight = 0
let openIssuesWeight = 0
let mergedWeight = 0
let commentPrWeight = 0
let closedIssuesWeight = 0
let commentIssuesWeight = 0

exports.get = async (req, res, next) => {
  const owner = req.query.owner
  const repository = req.query.repository
  const token = req.query.token
  rankingRequest = []
  rankingResponse = []

  if (req.query.commits) {
      commitsWeight = req.query.commits
  }
  if (req.query.openissues) {
      openIssuesWeight = req.query.openissues
  }
  if (req.query.merged) {
      mergedWeight = req.query.merged
  }
  if (req.query.commentpr) {
      commentPrWeight = req.query.commentpr
  }
  if (req.query.closedissues) {
      closedIssuesWeight = req.query.closedissues
  }
  if (req.query.commentissues) {
      commentIssuesWeight = req.query.commentissues
  }

  if (owner === undefined || repository === undefined || token === undefined) {
      res.status(400).send("Error 400: Bad Request")
  } else {
    const urlParams = `?owner=${owner}&repository=${repository}&token=${token}`

    await axios
      .get(urlCommits + urlParams)
      .then(async response => {
        const commitsRanking = response.data
        rankingRequest.push(commitsRanking)
        await rankingRequest[0].forEach(contribution => {
            let match = false
            let score = contribution.commits * commitsWeight

            let contributor = { name: contribution.name, score: score, commits: contribution.commits }
            rankingResponse.push(contributor)
        })
      })
      .catch(function(err) {
        console.log(err)
      })
    await axios
      .get(urlIssues + urlParams)
      .then(async response => {
        const issuesRanking = response.data
        rankingRequest.push(issuesRanking)
        await rankingRequest[1].forEach(contribution => {
          let match = false
          let score = contribution.opened_issues * openIssuesWeight + 
              contribution.closed_issues * closedIssuesWeight + contribution.comments * commentIssuesWeight

          for (let contributor in rankingResponse) {
            if (rankingResponse[contributor].name === contribution.name) {
                rankingResponse[contributor].score += score
                rankingResponse[contributor].opened_issues = contribution.opened_issues
                rankingResponse[contributor].closed_issues = contribution.closed_issues
                rankingResponse[contributor].comment_issues = contribution.comments
                match = true
            }
          }
          if (match === false) {
            let contributor = { name: contribution.name, score: score, 
                               opened_issues: contribution.opened_issues, closed_issues: contribution.closed_issues, comment_issues: contribution.comments }
            rankingResponse.push(contributor)
          }
        })
      })
      .catch(function(err) {
        console.log(err)
      })
    await axios
      .get(urlPullrequests + urlParams)
      .then(async response => {
        const pullRequestsRanking = response.data
        rankingRequest.push(pullRequestsRanking)
        await rankingRequest[2].forEach(contribution => {
            let match = false
            let score =
            contribution.merged_pull_requests * mergedWeight +
            contribution.comments * commentPrWeight

            for (let contributor in rankingResponse) {
                if (rankingResponse[contributor].name === contribution.name) {
                    rankingResponse[contributor].score += score
                    rankingResponse[contributor].merged_pull_requests = contribution.merged_pull_requests
                    rankingResponse[contributor].comment_pr = contribution.comments
                    match = true
                }
              }
            if (match === false) {
                let contributor = { name: contribution.name, score: score, 
                                   merged_pull_requests: contribution.merged_pull_requests, 
                                   comment_pr: contribution.comments }
            rankingResponse.push(contributor)
            }
        })
      })
      .catch(function(err) {
        console.log(err)
      })
    rankingResponse.sort((a, b) => {
      if (a.score > b.score) {
        return -1
      }
      if (a.score < b.score) {
        return 1
      }
      return 0
    })
    res.status(200).json(rankingResponse)
  }
}
