const server = require('../main');
const request = require('supertest');

describe("test customers -> signIn", () => {
    const correctData = {
        "email": "test@gmail.com",
        "password": "test"
    }

    const incorrectData = {
        "email": "test@gmail.com",
        "password": "test1"
    }

    it('should get success response', async () => {
        const successResponse = await request(server)
            .post('/api/customers/signin')
            .send(correctData);
        expect(successResponse.status).toBe(200);
        expect(successResponse.body).toHaveProperty('data');
    });
    it('should get bad request response', async () => {
        const successResponse = await request(server)
            .post('/api/customers/signin')
            .send(incorrectData);
        expect(successResponse.status).toBe(400);
        expect(successResponse.body).toHaveProperty('message');
        expect(successResponse.body).toHaveProperty('detail');
        expect(successResponse.body.detail).toBe("password mismatch");
    });
});
