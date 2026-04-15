const { getProperty } = require('../../utils/configReader');
const { expect } = require('@playwright/test');

class LoginPage {
  static async login(page, username, password) {
    const usernameField = getProperty('usernameField');
    const passwordField = getProperty('passwordField');
    const loginButton = getProperty('loginButton');

    await page.locator(usernameField).fill(username);
    await page.locator(passwordField).fill(password);
    await page.locator(loginButton).click();
  }

  static async verfyLoginSuccess(page) {
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
    await expect(page.locator('.shopping-cart-link')).toBeVisible();
  }
}

module.exports = { LoginPage };