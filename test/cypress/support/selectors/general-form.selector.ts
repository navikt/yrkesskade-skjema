export const general = {
  nextStep: () => cy.get('[data-testid=neste-steg]'),
  backStep: () => cy.get('[data-testid=tilbake-steg]'),
  feilmeldinger: () => cy.get('.navds-error-message')
}
