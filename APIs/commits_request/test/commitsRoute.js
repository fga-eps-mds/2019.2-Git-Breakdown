const chai = require('chai')
const axios = require('axios')
const expect = chai.expect

const urlBase = 'http://localhost:3001/commits'
const token = require('../../constants')
const urlEndpoint = urlBase + '?owner=fga-eps-mds&repository=2019.2-Git-Breakdown&token=' + token


describe('Commits route tests', () => {
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
           
        if(_body[0].commits != undefined){
          _body.forEach((obj) => {
            expect(_body[obj]).to.have.property('name')
            expect(_body[obj]).to.have.property('commits')
          })  
        }
      }
    ).catch(err => {
      const errorResponse = err
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