const chai = require('chai')
const axios = require('axios')
const expect = chai.expect

const token ='34736585925fcffda98155ba9877a7989a623702'
const urlBase = 'http://localhost:3004/branches'
const urlEndpoint = urlBase + '?owner=fga-eps-mds&repository=2019.2-Git-Breakdown' + token
// const url = urlBase + '?owner=f'

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

        if(_body.branches != undefined){
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
    })
    done()
  })
})