const chai = require('chai')
const branches = require('../src/routes/branchRoute')
const assert = chai.assert
const request = require('request')
const should = chai.should
const expect = chai.expect

const urlBase = 'http://localhost:3000/routes'

describe('branchRoute teste', () => 
{
  it('Teste de requisicao', () => 
  {
    request.get(
    {
      url : urlBase + '?owner=fga-eps-mds&repository=2019.2-Git-Breakdown'
    },
    (error, response, body) => 
    {
      let _body = {}
      try
      {
        _body = JSON.parse(body)
      }
      catch(e)
      {
        _body = {}
      }
      if (!(response === undefined))
      {
        expect(response.statusCode).to.equal(200)  
      }
    })
  })

  it('Teste de requisicao sem parametros', () => 
  {
    request.get(
    {
      url : urlBase + '?owner=f'
    },
    (error, response, body) => 
    {
      let _body = {}
      try
      {
        _body = JSON.parse(body)
      }
      catch(e)
      {
        _body = {}
      }

      if (!(response == undefined))
      {
        expect(response.statusCode).to.equal(400)
      }
    }
    )
  })
})