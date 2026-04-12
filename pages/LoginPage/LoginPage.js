const { getProperty } = require('../../utils/configReader');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = getProperty('usernameField');
    this.passwordField = getProperty('passwordField');
    this.loginButton = getProperty('loginButton');
  }

  async login(username, password) {
    await this.page.locator(this.usernameField).fill(username);
    await this.page.locator(this.passwordField).fill(password);
    await this.page.locator(this.loginButton).click();
  }

  async verfyLoginSuccess() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(this.page.locator('.app_logo')).toHaveText('Swag Labs');
    await expect(this.page.locator('.shopping-cart-link')).toBeVisible();
  }
}

module.exports = { LoginPage };