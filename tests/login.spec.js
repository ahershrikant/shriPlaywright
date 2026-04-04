import{test, expect} from '@playwright/test';

test('login test', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').type('standard_user');
    await page.locator('#password').type('secret_sauce');
    await page.locator('#login-button').click();
});