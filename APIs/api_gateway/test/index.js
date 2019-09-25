const chai = require('chai')
const assert = chai.assert
const request = require('request')
const expect = chai.expect
const index = require('../src/index').app
const superRequest = require('supertest')

describe('API Gateway test', () => {
    let urlBase = 'http://localhost:3000'
    let urlParams = '?owner=fga-eps-mds&repository=2019.2-Git-Breakdown'
    it('/issues: valid request', async () => {
        await request.get( {
            url : urlBase+'/issues'+urlParams
        }, (error, response, body) => {
                let _body = {}
                try{
                  _body = JSON.parse(body)
                }
                catch(e){
                  _body = {}
                }
                console.log(body)
                if(response.status != undefined)
                    expect(response.status).to.equal(200)
                expect(_body).to.have.property('open')
                expect(_body).to.have.property('closed')
                expect(_body).to.have.property('openPercent')
                expect(_body).to.have.property('closedPercent')
            }
        )
    })
    it('/issues: invalid request', async () => {
        await request.get( {
            url : urlBase+'/issues'
        }, (error, response, body) => {
                let _body = {}
                try{
                  _body = JSON.parse(body)
                }
                catch(e){
                  _body = {}
                }
                console.log(body)
                if(response.statusCode != undefined)
                    expect(response.statusCode).to.equal(400)
            }
        )
    })
});