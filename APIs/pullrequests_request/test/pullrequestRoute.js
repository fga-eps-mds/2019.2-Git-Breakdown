const chai = require('chai')
const issues = require('../src/routes/pullrequestRoute')
const assert = chai.assert
const request = require('request')
const should = require('should')
const expect = chai.expect
chai.use(require('chai-json'));

const urlBase = 'http://localhost:3000/pullrequests'

describe('PullRequests route tests', () => {
  it('Test: Request valid', (done) => {
    request.get(
      {
        url : urlBase + '?owner=fga-eps-mds&repository=2019.2-Git-Breakdown'
      },
      (error, response, body) => {

        let _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }
          
        /*for(issue in body){
           expect(body).to.have.nested.property(issue.pull_request)
        }*/
          expect(response.statusCode).to.equal(200)
        done();
      }
    );
  });

  it('Test: Request without parameters', (done) => {
    request.get(
      {
        url : urlBase + '?owner=f'
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