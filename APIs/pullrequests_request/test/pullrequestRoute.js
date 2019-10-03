const chai = require('chai')
const issues = require('../src/routes/pullrequestRoute')
const assert = chai.assert
const request = require('request')
const should = require('should')
const axios = require('axios')
const expect = chai.expect
chai.use(require('chai-json'));

const urlBase = 'http://localhost:3000/pullrequests'

describe('PullRequests route tests', () => {
  it('Test: Request valid', () => {
    axios.get(
      {
        url : urlBase + '?owner=fga-eps-mds&repository=2019.2-Git-Breakdown'
      },
      async (error, response, body) => {

        let _body = {};
        try{
          _body = await JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        if(response.status != undefined)
            expect(response.statusCode).to.equal(200);

        if(_body != undefined){
            expect(_body).to.have.property('open')
            expect(_body).to.have.property('closed')
            expect(_body).to.have.property('refused_percent')
        }
      }
    );
  });

  it('Test: Request without parameters', () => {
    axios.get(
      {
        url : urlBase + '?owner=f'
      },
      async (error, response, body) => {

        let _body = {};
        try{
          _body = await JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        expect(response.statusCode).to.equal(400);
      }
    );
  });
});