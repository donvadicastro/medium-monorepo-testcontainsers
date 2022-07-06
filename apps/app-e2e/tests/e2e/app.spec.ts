const request = require("supertest");

describe('Complete E2E APP tests', () => {
    it('Check message', async () => {
        const API = request(process.env['APP_URL']);
        const response = await API.get('/').expect(200);

        expect(response.body).toBeDefined();
    });
});