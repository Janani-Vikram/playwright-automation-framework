const { test, expect } = require('@playwright/test');
import { userData } from '../../test-data/data';
const fs = require('fs');

test('Book Store Application validation', async ({ page }) => {

  //Navigate to DemoQA
  await page.goto('https://demoqa.com/');

  //Navigate to Book Store Application
  await page.click('text=Book Store Application');

  //Login
  await page.click('text=Login');
  await page.fill('#userName', userData.username);
  await page.fill('#password', userData.password);
  await page.click('#login');

  //Validate username & logout button
  await expect(page.locator('#userName-value')).toHaveText(userData.username);
  await expect(page.locator('button:text("Log out")')).toBeVisible();

  //Click Book Store
  await page.click('#gotoStore');

  //Search for book
  await page.fill('#searchBox', userData.bookName);

  //Validate search result
  const bookRow = page.locator('.rt-tr-group').first();
  await expect(bookRow).toContainText(userData.bookName);

  //Extract book details
  const title = await bookRow.locator('a').textContent();
  const author = await bookRow.locator('.rt-td').nth(2).textContent();
  const publisher = await bookRow.locator('.rt-td').nth(3).textContent();

  const content = `
Book Details:
Title: ${title}
Author: ${author}
Publisher: ${publisher}
`;

  //Write details to file
  fs.writeFileSync(userData.filePath, content);
  console.log('Book details written to file');

  //Logout
  await page.click('button:text("Log out")');
});
