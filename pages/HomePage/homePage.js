const { getProperty } = require('../../utils/configReader');
const { expect } = require('@playwright/test');

class HomePage {
  static async verifyHomePageTitle(page) {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await expect(page.locator('.inventory_item_name')).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)',
    ]);
    await expect(page.locator('.inventory_item_price')).toHaveText([
      '$29.99',
      '$9.99',
      '$15.99',
      '$49.99',
      '$7.99',
      '$15.99',
    ]);
  }
}

module.exports = { HomePage };