const chai = require('chai')
const axios = require('axios')
const expect = chai.expect
chai.use(require('chai-json'))

const urlBase = 'http://localhost:3005/ranking'
const token = require('../../constants')
const urlEndpoint = urlBase + '?owner=fga-eps-mds&repository=2019.2-Git-Breakdown&token=' + token

describe('Ranking test', () => {
  it('Test: Request valid', (done) => {
    axios.get(urlEndpoint).then(response => {

        let _body = {};
        try{
          _body = response.data
        }
        catch(e){
          _body = {}
        }

        if(response.status != undefined)
            expect(response.status).to.equal(200);

        if(_body != undefined){
            expect(_body[0]).to.have.property('name')
        }
      }
    ).catch(err => {
      const errorResponse = err
    })
    done()
  })  
})