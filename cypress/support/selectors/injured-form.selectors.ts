export const injuredForm = {
  roleOptions: () => cy.get('[data-testid=injured-role-options]'),
  position: () => cy.get('[data-testid=injured-position]'),
  idNumber: () => cy.get('[data-testid=injured-id-number]')
}
