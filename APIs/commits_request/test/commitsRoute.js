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
            expect(_body[1]).to.have.property('name')
            expect(_body[1]).to.have.property('commits')
            expect(_body[1]).to.have.property('additions')
            expect(_body[1]).to.have.property('deletions')
        }
        
      }
    ).catch(err => {
      console.log(err)
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