# Playwright Automation Assignment

This project demonstrates **Playwright automation using JavaScript** for both **UI** and **API** testing.

---

## Tech Stack
- Playwright
- JavaScript (Node.js)
- GitHub Actions

---

## Project Structure

├── tests
│   ├── ui
│   │   └── bookstore.js
│   └── api
│       └── reqres.js
├── test-data
|   └── data.js
├── playwright.config.js
├── .env
├── package.json
├── README.md
└── .gitignore

---

## UI Automation

Application: https://demoqa.com/

### Test Scenario
1. Navigate to DemoQA
2. Manually create a new user (registration is not automated)
3. Login using the created user
4. Validate username and logout button
5. Navigate to Book Store
6. Search for **Learning JavaScript Design Patterns**
7. Validate the search result
8. Capture and write **Title, Author, Publisher** into a file
9. Logout

---

## API Automation

Base URL: https://reqres.in/

### Project Details
- **Project:** Playwright Tests
- **Collection:** Users
- All API tests are executed under the **Users** collection

### API Scenarios
1. Create a user and validate status code  
2. Store the generated userId  
3. Fetch the created user and validate details  
4. Update the user name and validate the response  

### API Authentication

Reqres public APIs do not work reliably with Playwright without authentication.

To ensure stable execution:
- A Reqres Pro project was created
- An API key is used via request headers
- API key is stored securely in **GitHub Secrets**

---

## Notes
- Written using **JavaScript**
- Focus on clear, stable, real-world automation flows

---
