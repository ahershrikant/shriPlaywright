// tests/login.spec.js
const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('login test using properties file', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');
});