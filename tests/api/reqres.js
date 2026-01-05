const { test, expect } = require('@playwright/test');
import dotenv from 'dotenv';

test.describe('Reqres Pro API Automation', () => {

    dotenv.config();

    const API_KEY = process.env.REQRES_API_KEY;
    const BASE_URL = 'https://reqres.in/api';

    let userId;

    const headers = {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
    };

    test('Create a user and store userId', async ({ request }) => {
        console.log(`Headers ${headers}`)
        const response = await request.post(`${BASE_URL}/collections/users/records?project_id=1127`, {
            headers: headers,
            data: {
                "data": {
                    "name": "Janani vikram",
                }
            }
        });

        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        userId = responseBody.data.id; // Store userId for next tests

        console.log(`Created User ID: ${JSON.stringify(responseBody)}`);
        expect(userId).toBeDefined();
    });

    test('Get the created user details', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/collections/users/records/${userId}?limit=25`, {
            headers: headers
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.data.data.name).toBe('Janani vikram');
    });

    test('Update user name and validate', async ({ request }) => {

        const response = await request.put(`${BASE_URL}/collections/users/records?project_id=1127`, {
            headers: headers,
            data: {
                "data": {
                    "name": "Janani updated"
                }
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.data.name).toBe('Janani updated');
        console.log('Update Successful:', responseBody.data.name);
    });
});