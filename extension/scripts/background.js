// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict'

let url_base = 'http://18.215.242.203:3000'
let issuesResponse, commitsResponse, branchesResponse, prResponse

chrome.runtime.onInstalled.addListener(function() 
{
  
})

// adding message listener to make fetch requests for screen.js and send data back
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) 
{
    chrome.storage.sync.get('oauth2_token', function(res) 
    {
        if (res.oauth2_token != undefined)
        {
          chrome.tabs.query
          ({
              'active': true, 'lastFocusedWindow': true
          },
          function (tabs) 
          {
              let url = tabs[0].url.split("/")
              let owner = url[3]
              let repo = url[4].split("#")[0]
              let url_aux = `?owner=${owner}&repository=${repo}&token=${res.oauth2_token}`
              
              let url_fetch = url_base + '/commits' + url_aux

              // async function to make requests
              const asyncFetch = async () => await (await fetch(url_fetch)) 

              // commits request
              asyncFetch().then((resp) => resp.json()).then(function(data)
              {
                commitsResponse = data
              }).catch(function(err)
              { 
                  console.log("Error: URL = " + url_fetch + "err: " + err)
              })

              // issues request
              url_fetch = url_base + '/issues' + url_aux
              asyncFetch().then((resp) => resp.json()).then(function(data)
              {
                issuesResponse = data
              }).catch(function(err)
              { 
                  console.log("Error: URL = " + url_fetch + "err: " + err)
              })

              // branches request
              url_fetch = url_base + '/branches' + url_aux
              asyncFetch().then((resp) => resp.json()).then(function(data)
              {
                branchesResponse = data
              }).catch(function(err)
              { 
                  console.log("Error: URL = " + url_fetch + "err: " + err)
              })

              // prs
              url_fetch = url_base + '/pullrequests' + url_aux
              asyncFetch().then((resp) => resp.json()).then(function(data)
              {
                prResponse = data
              }).catch(function(err)
              { 
                  console.log("Error: URL = " + url_fetch + "err: " + err)
              })

          })

        }
    })
    sendResponse({issues: issuesResponse, commits: commitsResponse, branches: branchesResponse,
      pullrequests: prResponse}) // sends back to screen.js the data fetched from API
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


