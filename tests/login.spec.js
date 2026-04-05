import{test, expect} from '@playwright/test';
import { asyncWrapProviders } from 'node:async_hooks';

test('login test', async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
await page.getByPlaceholder('Username').fill('standard_user');
await page.getByPlaceholder('Password').fill('secret_sauce');
await page.getByRole('button', { name: 'Login' }).click();

    
});