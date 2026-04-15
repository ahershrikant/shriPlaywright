// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage/LoginPage');
const { HomePage } = require('../../pages/HomePage/homePage');

test.describe.serial('Login Tests - Sequential', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    // Setup browser before all tests
    page = await browser.newPage();
    await page.goto('https://www.saucedemo.com/');
    console.log('Browser launched');
  });

  test('login test using properties file', async () => {
    await LoginPage.login(page, 'standard_user', 'secret_sauce');
    await LoginPage.verfyLoginSuccess(page);
    await HomePage.verifyHomePageTitle(page);
  });

  // test('login test using properties file with valid userName', async () => {
  //   await loginPage.login('standard_user', '');
  //   await expect(page).toHaveURL('https://www.saucedemo.com/');
  // });

  test.afterAll(async () => {
    // Cleanup
    await page.close();
  });
});