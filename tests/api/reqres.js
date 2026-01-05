const { test, expect } = require('@playwright/test');

test.describe('Reqres Pro API Automation', () => {

    const API_KEY = '${process.env.REQRES_API_KEY}';
    const BASE_URL = 'https://reqres.in/api/collections';

    let userId;

    const headers = {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
    };

    test('Create a user and store userId', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/collection/users/records`, {
            headers: headers,
            data: {
                "name": "Janani",
                "job": "QA Automation Engineer"
            }
        });

        // Validate status code 201 (Created)
        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        userId = responseBody.id; // Store userId for next tests

        console.log(`Created User ID: ${userId}`);
        expect(userId).toBeDefined();
    });

    test('Update user name and validate', async ({ request }) => {

        const response = await request.patch(`${BASE_URL}/users/records/${userId}`, {
            headers: headers,
            data: {
                "name": "Janani Updated"
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        // Validate the name update
        expect(responseBody.name).toBe('Janani Updated');
        console.log('Update Successful:', responseBody.name);
    });

    test('Get the created user details', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/users/records/${userId}`, {
            headers: headers
        });
        console.log(`Fetching from: ${BASE_URL}/users/records/${userId}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.name).toBe('Janani Updated');
    });
});