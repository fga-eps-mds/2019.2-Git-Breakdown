const chai = require('chai')
const request = require('request')
const expect = chai.expect

const urlBase = 'http://localhost:3000/commits'
const token =''

describe('Commits route tests', () => {
  it('Test: Request valid', async () => {
    await request.get(
      {
        url : urlBase + '?owner=fga-eps-mds&repository=2019.2-Git-Breakdown&token=' + token
      },
      (error, response, body) => {

        let _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        if(response.status != undefined)
            expect(response.statusCode).to.equal(200);
        if(_body[0].commits != undefined){
            expect(_body[1]).to.have.property('name')
            expect(_body[1]).to.have.property('commits')
            expect(_body[1]).to.have.property('additions')
            expect(_body[1]).to.have.property('deletions')
        }
      }
    );
  });
  it('Test: Request without parameters', (done) => {
    request.get(
      {
        url : urlBase
      },
      (error, response, body) => {

        let _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        expect(response.statusCode).to.equal(400);
        done();
      }
    );
  });
});