const request = require("supertest");

describe('Complete E2E API tests', () => {
    it('Check message', async () => {
        const API = request(process.env['API_URL']);
        const response = await API.get('/api/hello').expect(200);

        expect({"message": "Welcome to api!"}).toEqual(response.body);
    });

    it('Check user created', async () => {
        const API = request(process.env['API_URL']);
        const userData = { firstName: 'first1', lastName: 'last1', isActive: true };

        let response = await API.post('/api/users').send(userData).expect(201);
        expect({...userData, id: expect.anything()}).toEqual(response.body);

        await API.post('/api/users').send({ firstName: 'first2', lastName: 'last2', isActive: false }).expect(201);
        
        response = await API.get('/api/users').expect(200);
        expect(2).toBe(response.body.length);
    });
});