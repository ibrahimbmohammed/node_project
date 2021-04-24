const supertest = require('supertest');
const app = require('../../app');


describe('GET /api/v1/states',()=>{
    it('should respond with a message', async()=>{
      const response = await  supertest(app)
        .get('/api/v1/state')/// correct route
        .expect('Content-Type', /json/)
        .expect(200);
        expect(response.body)
        .toEqual([])
    })
}) 

//expect(response.body.length).toBeGreaterThan(0);