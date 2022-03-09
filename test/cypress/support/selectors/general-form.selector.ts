export const general = {
  nextStep: () => cy.get('[data-testid=neste-steg]'),
  feilmeldinger: () => cy.get('.navds-error-message')
}
