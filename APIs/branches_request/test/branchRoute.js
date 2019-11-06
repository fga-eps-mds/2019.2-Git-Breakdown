const chai = require('chai')
const branches = require('../src/routes/branchRoute')
const assert = chai.assert
const request = require('request')
const axios = require('axios')
const expect = chai.expect

const urlBase = 'http://localhost:3000/branches'

describe('Branches route tests', () => {
  it('Test: Request valid', () => {
    axios.get(
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

        if(response.status != undefined)
            expect(response.statusCode).to.equal(200);

        if(_body != undefined){
            expect(_body).to.have.property('active_branches')
            expect(_body).to.have.property('percentage_merged')
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