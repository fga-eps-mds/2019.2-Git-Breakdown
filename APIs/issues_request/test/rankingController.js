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