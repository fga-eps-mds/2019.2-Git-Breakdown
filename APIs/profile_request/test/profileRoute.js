const chai = require('chai')
const axios = require('axios')
const expect = chai.expect

const urlBase = 'http://localhost:3006/infos'
const token = require('../../constants')
const urlEndpoint = urlBase + '?owner=fga-eps-mds&repository=2019.2-Git-Breakdown&token=' + token


describe(' route tests', () => {
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
           
        if(_body != undefined){
            expect(_body).to.have.property('login')
            expect(_body).to.have.property('avatar')
        }
        done()  
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
      if(err.response.status === 400){
        expect(err.response.status).to.equal(400)
      }else{
        expect(err.response.status).to.equal(404)
      } 
    })
      done()
  })
})
