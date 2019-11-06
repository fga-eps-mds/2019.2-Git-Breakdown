const express = require('express')
const chai = require('chai')
const axios = require('axios')
const infos_route = express.Router()
const expect = chai.expect


const urlBase = 'http://localhost:3006/infos'
const token = require('../../constants')
const urlEndpoint = urlBase + '?owner=fga-eps-mds&repository=2019.2-Git-Breakdown&token=' + token


describe('Infos route tests', () => {
  it('Test: Request valid', (done) => {

    axios.get(urlEndpoint).then(response => {

        let _body = {}
        try{
        _body = response.data
        }
        catch(e){
        _body = {}
        }

        if(response.status != undefined)
            expect(response.status).to.equal(200)
        
        if(_body[0].infos != undefined){
            expect(_body[1]).to.have.property('login')
            expect(_body[1]).to.have.property('avatar')
            expect(_body[1]).to.have.property('bio')
            expect(_body[1]).to.have.property('location')
            done()
        }  
    }
    ).catch(err => {
    const errorResponse = err
    done()
    })
    done()
  })
  
  it('Test: Request without parameters', (done) => {
    axios.get(urlBase).then(response => {

        let _body = {}
        try{
          _body = response.data
        }
        catch(e){
          _body = {}
        }
      }
    ).catch(err => {
      expect(err.response.status).to.equal(400)
      done()
    })
  })
})