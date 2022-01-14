export const network = {
  intercept: (url: string, fixture?: string): Cypress.Chainable<null> => {

    if (fixture) {
      return cy.intercept(url, { fixture: fixture});
    }

    return cy.intercept(url);
  }
}
