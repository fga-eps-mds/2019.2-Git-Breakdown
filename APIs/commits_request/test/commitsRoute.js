const request = require('supertest')
const app = require('../src/app')
const { getInitUnixTime } = require('../src/controllers/commitController')

const token = require('../../constants').token

describe('Commits route tests', () => {

    it('should respond with status code 200', async() => {
        const res = await request(app).get(`/commits?owner=fga-eps-mds&repository=2019.2-Git-Breakdown&token=${token}&weekday=0&sprintLength=7&unixTime=0`)
        
        expect(res).toEqual(expect.any(Object));
        expect(res.statusCode).toEqual(200);
    })
    
    it('should respond with status code 400', async() => {
        const res = await request(app).get(`/commits?owner=fga-eps-mds&repository=2019.2-Git-Breakdown`)
        
        expect(res).toEqual(expect.any(Object));
        expect(res.statusCode).toEqual(400);
    })
    
//    it('test getInitUnixTime', (done) => {
//        const unixTime = getInitUnixTime(0,0)
//        expect(unixTime).toEqual(0)
//        done()
//    })

})