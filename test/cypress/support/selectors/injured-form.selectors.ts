export const injuredForm = {
  roleOptions: () => cy.get('[data-testid=injured-role-options]'),
  position: () => cy.get('.injured-position input'),
  positionSelect: () => cy.get('[data-testid="injured-role-select"]'),
  idNumber: () => cy.get('[data-testid=injured-id-number]')
}
