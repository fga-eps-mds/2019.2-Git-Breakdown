const express = require('express')
const axios = require('axios')
const commit_route = express.Router()
const queryString = { state:'all', per_page: 10000 }

const MAX = 1000000000

let initial_unix_time = 0
let init_weekday = 0
let sprint_length = 7

commit_route.get = async (req, res, next) => {

    //verify if exist the necessary parms to send a get request
    const owner = req.query.owner
    const repository = req.query.repository
    const endpoint = 'contributors'
    contributorsInformation = []

    if (owner === undefined || req.query.repository === undefined || req.query.token === undefined) {
        return res.status(400).send('Error 400: Bad Request')
    }
    else {
        //header params send to get request
        const gitApiUrl = 'https://api.github.com'
        const url_endpoint = `${gitApiUrl}/repos/${owner}/${repository}/${endpoint}`
        const header_option = {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Accept-Charset': 'utf-8',
                'User-Agent': '2019.2-Git-Breakdown',
                'Authorization': `token ${req.query.token}`
            },
            params: queryString
        }

        try {
            await axios.get(url_endpoint, header_option).then(async (response) => {
                //commits hold a vector of json's data
                const contributors = response.data
                await contributors.forEach((contributor) => {
                    let committer = { 'name': contributor.login, 'commits': contributor.contributions }
                    contributorsInformation.push(committer)
                })

                const url_endpointB = `${gitApiUrl}/repos/${owner}/${repository}/stats/commit_activity`

                await axios.get(url_endpointB, header_option).then(async (response) =>
                {
                    const stats = response.data
                    let length = contributorsInformation.length
                    
                    initial_unix_time = req.query.unixTime
                    init_week_day = req.query.weekday
                    sprint_length = req.query.sprintLength

                    let initWeek
                    
                    if (initial_unix_time === 0)
                        initWeek = filterStartingWeek(stats, undefined)
                    else
                    {
                        let init = getInitUnixTime(init_week_day, initial_unix_time)
                        initWeek = filterStartingWeek(stats, init)
                    }

                    let sprints = getSprintTotals(stats, initWeek, init_week_day, sprint_length)

                    contributorsInformation.push(sprints)

                    let bestSprint = getBestSprint(sprints)

                    contributorsInformation.push(bestSprint)

                    let worstSprint = getWorstSprint(sprints)

                    contributorsInformation.push(worstSprint)

                    contributorsInformation.push(getAverageCommitsPerSprint(sprints))

                    return res.status(200).json(contributorsInformation)
                })

                
            }).catch(function (err) {
                console.log(err)
            })
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

/**
 * O usuário escolhe uma data para ser a inicial, e esse dia será transformado em UNIX TIME. Porém, como ele pode não ser
 * um domingo e o JSON começa pelos domingos, essa função faz a conversão pro domingo da semana escolhida.
 * 
 * @param {*} weekday dia da semana escolhido pelo usuário 0 = domingo, 1 = segunda, ..., 6 = sábado
 * @param {*} time ao escolher nas configurações o dia inicial, este é transformado em UNIX TIME que é recebido aqui
 * como paramêtro
 */
function getInitUnixTime(weekday, time)
{
  // a gnt pega o tempo inicial da data que o usuario escolheu e acha o domingo da sua semana
  return (weekday === 0? time : (time - (weekday*86400)))
}

/**
 * Retorna a posição do vetor do JSON que contém a semana inicial
 * 
 * @param {*} data 
 * @param {*} initTime 
 */
function filterStartingWeek(data, initTime)
{
  for (let i = 0; i < data.length; i++)
  {
    if (initTime === undefined)
    {
        if (data[i] > 0) 
        {
          return i
        }
    }
    else
    {
        if (data[i].week === initTime)
          return i
        else if (data[i].week > initTime)
        {
        if (data[i-1].week < initTime) 
            return (i-1) // se o tempo inicial definido não é de um domingo pegamos do domingo que iniciou a semana
        }
    }
  }
  return 0
}

/**
 * Pega o total de commits por sprint
 * 
 * @param {*} data json
 * @param {*} initWeek posicao da semana inicial no json
 * @param {*} weekday dia da semana que começa a sprint
 * @param {*} sprintLength tamanho da sprint
 */
function getSprintTotals(data, initWeek, weekday, sprintLength)
{
  let totals = []
  let sprints = []
  let t_count = 0

  for (let i = 0; i < data.length - initWeek; i++)
    totals[i] = 0 // inicializar o vetor com 0

  for (let i = initWeek; i < data.length; i++) // começamos na semana inicial definida
  {
    let startingDate = data[i].week + (86400 * weekday)
    let endDate = data[i].week + (86400 * sprintLength)
    let dayTotals = data[i].days
    let count = sprintLength
    for (let j = weekday; j < 7; j++) // para cada dia dessa semana, comecando do dia inicial
    {
      totals[t_count] += dayTotals[j] // somamos o total
      count--; // diminuimos o contador de dias corridos da sprint
    }
    if (count !== 0) // se os 7 dias da semana acabou mas a sprint nao acabou, pegamos da proxima sprint
    {
      // devemos verificar se existe proxima sprint pelo menos
      if (i + 1 < data.length)
      {
        let k = 0
        while (count > 0) // enquanto a sprint n acaba
        {
          totals[t_count] += data[i+1].days[k] // vamos somando os da proxima semana
          count--
          k++
        }

      }
    }
    let currSprint = {'sprint': t_count+1, 'commits': totals[t_count], 'starting_date': convertFromUnixTime(startingDate+86400), 
   'ending_date': convertFromUnixTime(endDate)}
    sprints.push(currSprint)
    // agora que a sprint acabou, passamos pra proxima
    t_count++
  }

  return sprints
}

function getAverageCommitsPerSprint(sprints)
{
  let count = 0
  
  for (let i = 0; i < sprints.length; i++)
    count += sprints[i].commits

  let avg = count / sprints.length

  let avg_obj = {'average_commits': avg}
  
  return avg_obj
}

function getBestSprint(sprints)
{
  let max = {'sprint': 0, 'commits': 0, 'percentage_of_average': 0.0}
  for (let i = 0; i < sprints.length; i++)
  {
    if (sprints[i].commits > max.commits)
    {
      max.commits = sprints[i].commits
      max.sprint = sprints[i].sprint

      let avg = getAverageCommitsPerSprint(sprints)
      max.percentage_of_average = (max.commits / avg.average_commits).toFixed(2)
    }
  }
  return max
}

function getWorstSprint(sprints)
{
  let min = {'sprint': 999, 'commits': MAX, 'percentage_of_average': 0.0}
  for (let i = 0; i < sprints.length; i++)
  {
    if (sprints[i].commits < min.commits)
    {
      min.sprint = sprints[i].sprint
      min.commits = sprints[i].commits

      let avg = getAverageCommitsPerSprint(sprints)
      min.percentage_of_average = (min.commits / avg.average_commits).toFixed(2)
    }
  }
  return min
}

function convertFromUnixTime(unix_time)
{
  return new Date(unix_time*1000).toLocaleDateString("en-US")
}

//export this functionality as a module
module.exports = commit_route
