const request = require('supertest')
const app = require('../src/app')

const token = require('../../constants').token

describe('Issues route tests', () => {

    it('should respond with status code 200', async() => {
        const res = await request(app).get(`/issues?owner=fga-eps-mds&repository=2019.2-Git-Breakdown&token=${token}`)
        
        expect(res).toEqual(expect.any(Object));
        expect(res.statusCode).toEqual(200);
    })
    
    it('should respond with status code 400', async() => {
        const res = await request(app).get(`/issues?owner=fga-eps-mds&repository=2019.2-Git-Breakdown`)
        
        expect(res).toEqual(expect.any(Object));
        expect(res.statusCode).toEqual(400);
    })

})