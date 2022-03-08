export const injuredForm = {
  roleOptions: () => cy.get('[data-testid=injured-role-options]'),
  position: () => cy.get('.injured-position input'),
  positionSelect: (index: number) => cy.get(`#react-select-3-listbox li:nth-child(${index})`),
  idNumber: () => cy.get('[data-testid=injured-id-number]')
}
