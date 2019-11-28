const request = require('supertest')
const app = require('../src/app')

const token = require('../../constants').token

describe('PullRequests route tests', () => {

    beforeAll(() => {
        jest.setTimeout(10000);
    })
    
    it('should respond with status code 200', async() => {
        const res = await request(app).get(`/pullrequests?owner=fga-eps-mds&repository=2019.2-Git-Breakdown&token=${token}`)
        let json = JSON.parse(res.text)
        
        expect(res).toEqual(expect.any(Object));
        expect(res.statusCode).toEqual(200);
        
        expect(json).toHaveProperty('open')
        expect(json).toHaveProperty('open')
        expect(json).toHaveProperty('refused_percent')
    })
    
    it('should respond with status code 400', async() => {
        const res = await request(app).get(`/pullrequests?owner=fga-eps-mds&repository=2019.2-Git-Breakdown`)
        
        expect(res).toEqual(expect.any(Object));
        expect(res.statusCode).toEqual(400);
    })

})
