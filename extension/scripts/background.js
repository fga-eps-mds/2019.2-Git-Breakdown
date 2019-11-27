// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict'

let url_base = 'http://18.215.242.203:3000'

let fetchedData = []

const FETCH_METRICS = 
[
  'commits', // 0 
  'issues', // 1
  'branches', // 2
  'pullrequests', // 3
  'ranking' // 4
]

const FETCH_PROFILE = 
[
  'profile'
]

async function fetchData(type, aux)
{
    let url_fetch = `${url_base}/${type}/${aux}`
    try
    {
      return (await fetch(url_fetch)).json()
    }
    catch (err)
    {
      console.log('Error: URL = ', url_fetch, ' err: ', err)
    }
}

async function execute(request, aux)
{
  try {
    const data_ = await Promise.all(FETCH_METRICS.map(type => fetchData(type, aux)))

    console.log(data_[0])
    data_[0] = removeDuplicates(data_[0])
    data_[4] = removeDuplicates(data_[4])

    console.log(data_[0])

    fetchedData = data_
    fetchedData[5] = aux

    return data_
    
  } catch(err){
    console.log("GBD error at background.js\nAt execute():", err)
  }
}

function removeDuplicates(data)
{
  let array = data
  let seenNames = {}

  array = array.filter(function(curr)
  {
    if (curr.sprint !== undefined || curr.average_commits !== undefined)
    {
      return true
    }
    else
    {
      if (curr.name in seenNames)
      {
        return false
      }
      else
      {
        seenNames[curr.name] = true
        return true
      }
    }
  })

  return array
}

async function executeProfile(request, aux)
{
  try {
    console.log("executing profile")
    const data_ = await Promise.all(FETCH_PROFILE.map(type => fetchData(type, aux)))
    fetchedData = data_
    fetchedData[5] = aux
    return data_
  } catch(err){
    console.log("GBD error at background.js\nAt execute():", err)
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>
{
    let weights = request.metric
    chrome.storage.sync.get('oauth2_token', (res) =>
    {
        if (res.oauth2_token != undefined)
        {
            chrome.tabs.query
            ({
                'active': true, 'lastFocusedWindow': true
            },
            function (tabs) 
            {
                if (tabs[0] != undefined)
                {
                  try{
                    let url = tabs[0].url.split("/")
                    let owner = url[3]
                    let repo = url[4].split("#")[0]
                    let unix_time = request.unix_time
                    let weekday = request.weekday
                    let sprintLength = request.sprintLength
                    let url_aux = 
                    `?owner=${owner}&repository=${repo}&token=${res.oauth2_token}&commits=${weights[0]}&merged=${weights[1]}&openissues=${weights[2]}&commentpr=${weights[3]}&unixTime=${unix_time}&weekday=${weekday}&sprintLength=${sprintLength}`
                    if (request.getProfile)
                    {
                      console.log("fetching profile")
                      url_aux = 
                      `?owner=${request.profile}&repository=${repo}&token=${res.oauth2_token}`
                      executeProfile(request, url_aux).then(sendResponse)
                    }
                    else
                    {
                      console.log("not fetching profile")
                      if (fetchedData.length > 0 && fetchedData[0] != undefined &&
                        fetchedData[5] == url_aux)
                      {
                        console.log("returning fetched data")
                        sendResponse(fetchedData)
                      }
                      else
                      {
                        if (fetchedData.length > 0 && fetchedData[0] != undefined && fetchedData[5] != url_aux)
                          console.log("updating data")

                        console.log("fetching data")
                        execute(request, url_aux).then(sendResponse)
                      }
                    }
                  } catch (err) {
                      console.log("GBD erro at background.js\nAt chrome.runtime.onMessage.addListener\n At function(tab):", err)
                    }
                }
            })
        }
    })
    return true
})


chrome.runtime.onInstalled.addListener(function() 
{
})


chrome.declarativeContent.onPageChanged.removeRules(undefined, function() 
{
  chrome.declarativeContent.onPageChanged.addRules([
  {
    conditions: [new chrome.declarativeContent.PageStateMatcher(
    {
      pageUrl: {hostEquals: 'developer.chrome.com'},
    })
    ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
  }])
})


