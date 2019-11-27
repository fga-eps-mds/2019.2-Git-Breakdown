const axios = require('axios')
const request = require('supertest')
const app = require('../src/app')

const token = require('../../constants').token

describe('Issues ranking tests', () => {

    it('should respond with status code 200', async() => {
        const res = await request(app).get(`/issues/ranking?owner=fga-eps-mds&repository=2019.2-Git-Breakdown&token=${token}`)
        
        expect(res.body).toEqual(expect.any(Array));
        expect(res.body[0]).toHaveProperty('name', 'opened_issues', 'closed_issues', 'comments')
        expect(res.statusCode).toEqual(200);
    })
    
    it('should respond with status code 400', async() => {
        const res = await request(app).get(`/issues/ranking?owner=fga-eps-mds&repository=2019.2-Git-Breakdown`)
        
        expect(res).toEqual(expect.any(Object));
        expect(res.statusCode).toEqual(400);
    })

})

//describe('Issues ranking tests', () => {
//  it('Test: Request valid', (done) => {
//    axios.get(urlEndpoint).then(response => {
//
//        let _body = {}
//        try{
//          _body = response.data
//        }
//        catch(e){
//          _body = {}
//        }
//
//        expect(response.status).to.equal(200);
//        body.should.have.property('issues');
//      }
//    ).catch(err => {
//      const errorResponse = err
//    })
//    done()
//  })
//
//  it('Test: Request without parameters', (done) => {
//    axios.get(urlBase).then(response => {
//
//        let _body = {};
//        try{
//          _body = response.data
//        }
//        catch(e){
//          _body = {}
//        }
//      }
//    ).catch(err => {
//      if(err.response.status === 400){
//        expect(err.response.status).to.equal(400)
//      }else{
//        expect(err.response.status).to.equal(404)
//      } 
//    })
//    done()
//  }) 
//})  