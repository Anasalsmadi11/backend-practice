const supertest= require('supertest')
const app= require('./index')

describe('get response', ()=>{

    test('should respond with 200',async()=>{
        const response= await supertest(app).get('/test')
        expect(response.status).toBe(200)
    })
})