const {getProperty} = require('../../utils/configReader');

class HomePage {
    constructor(page) {
        this.page = page;
        this.homePageTitle = getProperty('homePageTitle');
    }

    async verifyHomePageTitle() {
    await expect(this.page.locator('.inventory_item')).toHaveCount(6);
    await expect(this.page.locator('.inventory_item_name')).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)',
    ]);
    await expect(this.page.locator('.inventory_item_price')).toHaveText([
      '$29.99',
      '$9.99',
      '$15.99',
      '$49.99',
      '$7.99',
      '$15.99',
    ]);
}}