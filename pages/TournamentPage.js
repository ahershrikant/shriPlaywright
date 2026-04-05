class TournamentPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://www.stickstats.in/search-tournaments');
  }

  async searchTournament(name) {
    await this.page.getByPlaceholder('🔍 Search tournaments by name...').fill(name);
  }

  async clickTournament(name) {
    await this.page.getByText(name).click();
  }

  async waitForTournamentResponse(id) {
    await this.page.waitForResponse(
      response => response.url().includes(`/api/tournaments/${id}`) && response.ok()
    );
  }
}

module.exports = { TournamentPage };