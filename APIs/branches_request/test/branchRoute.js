const chai = require('chai')
const branches = require('../src/routes/branchRoute')
const assert = chai.assert
const axios = require('axios')
const expect = chai.expect
const urlBase = 'http://localhost:3004/branches'
const urlEndpoint = urlBase + '?owner=fga-eps-mds&repository=2019.2-Git-Breakdown'
const url = urlBase + '?owner=f'

describe('Branches route tests', () => {
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
            expect(response.status).to.equal(200);

        if(_body != undefined){
            expect(_body).to.have.property('active_branches')
            expect(_body).to.have.property('percentage_merged')
        }
      }
    ).catch(err => {
      console.log(err)
    })
    done()
  })

  it('Test: Request without parameters', (done) => {
    axios.get(url).then(response => {

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
    })
    done()
  })
})