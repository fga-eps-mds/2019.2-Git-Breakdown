const chai = require('chai')
const issues = require('../src/routes/issueRoute')
const assert = chai.assert
const request = require('request')
const should = require('should')
const expect = chai.expect

const urlBase = 'http://localhost:3000/routes'

describe('Issue route tests', () => {
  it('Test: Request valid', () => {
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

        expect(response.statusCode).to.equal(200);
        done();
      }
    );
  });

  it('Test: Request without parameters', () => {
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