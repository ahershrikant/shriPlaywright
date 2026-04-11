const { getProperty } = require('../utils/configReader');

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
}

module.exports = { LoginPage };