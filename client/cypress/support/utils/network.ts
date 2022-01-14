export const network = {
  intercept: (url: string, fixture?: string): Cypress.Chainable<null> => {
    return cy.intercept(url, fixture);
  }
}
