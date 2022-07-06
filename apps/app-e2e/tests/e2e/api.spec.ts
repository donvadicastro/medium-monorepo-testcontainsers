const request = require("supertest");

describe('Complete E2E API tests', () => {
    it('Check message', async () => {
        const API = request(process.env['API_URL']);
        const response = await API.get('/api/hello').expect(200);

        expect({"message": "Welcome to api!"}).toEqual(response.body);
    });

    it('Check user created', async () => {
        const API = request(process.env['API_URL']);
        const userData = { firstName: 'first', lastName: 'last', isActive: true };

        let response = await API.post('/api/users').send(userData).expect(201);
        expect({...userData, id: expect.anything()}).toEqual(response.body);

        await API.post('/api/users').send(userData).expect(201);
        
        response = await API.get('/api/users').expect(200);
        expect(2).toBe(response.body.length);
    });
});