const chai = require('chai')
const axios = require('axios')
const expect = chai.expect

const urlBase = 'http://localhost:3002/routes/ranking'
const token = require('../../constants')
const urlEndpoint = urlBase + '?owner=fga-eps-mds&repository=2019.2-Git-Breakdown=' + token

describe('Issues ranking tests', () => {
  it('Test: Request valid', (done) => {
    axios.get(urlEndpoint).then(response => {

        let _body = {}
        try{
          _body = response.data
        }
        catch(e){
          _body = {}
        }

        expect(response.status).to.equal(200);
        body.should.have.property('issues');
      }
    ).catch(err => {
      const errorResponse = err
    })
    done()
  }) 
})  