const server = require('../main');
const request = require('supertest');

describe("test customers -> signUp", () => {
    const data = {
        "firstName": "test",
        "lastName": "test",
        "email": "test@gmail.com",
        "password": "test",
        "phoneNumber": "12345678901"
    }
    it('should get success response', async () => {
        const successResponse = await request(server)
            .post('/api/customers/signup')
            .send(data);
        expect(successResponse.status).toBe(200);
        expect(successResponse.body).toHaveProperty('data');
        expect(successResponse.body.data).toBe("signup successfully");
    });
    it('should get bad request response', async () => {
        const successResponse = await request(server)
            .post('/api/customers/signup')
            .send(data);
        expect(successResponse.status).toBe(400);
        expect(successResponse.body).toHaveProperty('message');
        expect(successResponse.body).toHaveProperty('detail');
        expect(successResponse.body.detail).toBe("Email is already exist");
    });
});
