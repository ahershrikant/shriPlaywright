// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage/LoginPage');

test.describe.serial('Login Tests - Sequential', () => {
  let loginPage;
  let page;
  let homePage;

  test.beforeAll(async ({ browser }) => {
    // Setup browser before all tests
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await page.goto('https://www.saucedemo.com/');
    console.log('Browser launched');
  });

  test('login test using properties file', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.verfyLoginSuccess();
    await homePage.verifyHomePageTitle();
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