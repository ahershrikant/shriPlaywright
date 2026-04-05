const { test } = require('@playwright/test');
const { TournamentPage } = require('../pages/TournamentPage');

test('stick stack test', async ({ page }) => {
  const tournamentPage = new TournamentPage(page);

  await tournamentPage.goto();
  await tournamentPage.searchTournament('Exhibition Tournament 2026');
  await tournamentPage.selectTournament('Exhibition Tournament 2026');
  await tournamentPage.waitForTournamentResponse('TOUR001');
});