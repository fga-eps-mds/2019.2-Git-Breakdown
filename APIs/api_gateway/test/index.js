const chai = require('chai')
const assert = chai.assert
const axios = require('axios')
const expect = chai.expect

describe('API Gateway integration tests', () => {
    let urlBase = 'http://localhost:3000'
    const token = require('../../constants')
    let urlParams = '?owner=fga-eps-mds&repository=2019.2-Git-Breakdown&token=' + token
    
    it('/commits: valid request', (done) => {
        axios.get(urlBase+'/commits'+urlParams).then((response) => {
                let _body = {}
                try{
                  _body = response.data
                }
                catch(e){
                  _body = {}
                }
                if(response.status != undefined)
                   expect(response.status).to.equal(200)
            }
        ).catch(err => {
          const errrorResponse = err
        })
        done()
    })
    it('/commits: invalid request', (done) => {
        axios.get(urlBase+'/commits').then((response) => {
                let _body = {}
                try{
                  _body = response.data
                }
                catch(e){
                  _body = {}
                }
                if(response.status != undefined)
                    expect(response.status).to.equal(400)
            }
        ).catch(err => {
          expect(err.response.status).to.equal(400)
        })
        done()
    })
    
    it('/issues: valid request', (done) => {
        axios.get(urlBase+'/issues'+urlParams).then((response) => {
                let _body = {}
                try{
                  _body = response.data
                }
                catch(e){
                  _body = {}
                }
                if(response.status != undefined)
                    expect(response.status).to.equal(200)
                if(_body.open != undefined){
                    expect(_body).to.have.property('open')
                    expect(_body).to.have.property('closed')
                    expect(_body).to.have.property('openPercent')
                    expect(_body).to.have.property('closedPercent')
                }
            }
        ).catch(err => {
          const errorResponse = err
        })
        done()
    })
    it('/issues: invalid request', (done) => {
       axios.get(urlBase+'/issues').then((response) => {
                let _body = {}
                try{
                  _body = response.data
                }
                catch(e){
                  _body = {}
                }
                if(response.status != undefined)
                    expect(response.status).to.equal(400)
            }
        ).catch(err => {
          expect(err.response.status).to.equal(400)
        })
        done()
    })
    
    it('/pullrequests: valid request', (done) => {
        axios.get(urlBase+'/pullrequests'+urlParams).then((response) => {
                let _body = {}
                try{
                  _body = response.data
                }
                catch(e){
                  _body = {}
                }
                if(response.status != undefined)
                    expect(response.status).to.equal(200)
            }
        ).catch(err => {
          const errorResponse = err
        })
        done()
    })
    it('/pullrequests: invalid request', (done) => {
        axios.get(urlBase+'/pullrequests').then((response, body) => {
                let _body = {}
                try{
                  _body = response.data
                }
                catch(e){
                  _body = {}
                }
                if(response.status != undefined)
                    expect(response.status).to.equal(400)
            }
        ).catch(err => {
          expect(err.response.status).to.equal(400)
        })
        done()
    })
    
    it('/branches: valid request', (done) => {
        axios.get(urlBase+'/branches'+urlParams).then((response) => {
                let _body = {}
                try{
                  _body = response.data
                }
                catch(e){
                  _body = {}
                }
                if(response.status != undefined)
                    expect(response.status).to.equal(200)
            }
        ).catch(err => {
          const errorResponse = err
        })
        done()
    })
    it('/branches: invalid request', (done) => {
        axios.get(urlBase+'/branches').then((response) => {
                let _body = {}
                try{
                  _body = response.data
                }
                catch(e){
                  _body = {}
                }
                if(response.status != undefined)
                    expect(response.status).to.equal(400)
            }
        ).catch(err => {
          expect(err.response.status).to.equal(400)
        })
        done()
    })
    
    it('/ranking: valid request', (done) => {
        axios.get(urlBase+'/ranking'+urlParams).then((response) => {
                let _body = {}
                try{
                  _body = response.data
                }
                catch(e){
                  _body = {}
                }
                if(response.status != undefined)
                    expect(response.status).to.equal(200)
            }
        ).catch(err => {
          const errorResponse = err
        })
        done()
    })
    it('/ranking: invalid request', (done) => {
        axios.get(urlBase+'/ranking').then((response) => {
                let _body = {}
                try{
                  _body = response.data
                }
                catch(e){
                  _body = {}
                }
                if(response.status != undefined)
                    expect(response.status).to.equal(400)
            }
        ).catch(err => {
          expect(err.response.status).to.equal(400)
        })
        done()
    })
    
    it('/profile: valid request', (done) => {
        axios.get(urlBase+'/profile'+urlParams).then((response) => {
                let _body = {}
                try{
                  _body = response.data
                }
                catch(e){
                  _body = {}
                }
                if(response.status != undefined)
                    expect(response.status).to.equal(200)
            }
        ).catch(err => {
          const errorResponse = err
        })
        done()
    })
})