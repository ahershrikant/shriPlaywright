import { test } from '@playwright/test';

test('stick stack test', async ({ page }) => {
  // Listen for console messages from the page
  page.on('console', msg => {
    console.log(`PAGE LOG: ${msg.type()} - ${msg.text()}`);
  });

  await page.goto('https://www.stickstats.in/search-tournaments');
  await page.getByPlaceholder('🔍 Search tournaments by name...').fill('Exhibition Tournament 2026');
  await page.getByText('Exhibition Tournament 2026').click();
  await page.waitForEvent('response', response =>
    response.url().includes('https://stickstatsbackend.onrender.com/api/tournaments/TOUR001') &&
    response.status() === 200
  );
});