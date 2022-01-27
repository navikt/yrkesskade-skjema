export const accidentForm = {
  severityOptions: () => cy.get('[data-testid=accident-severity-options]'),
  locationOptions: () => cy.get('[data-testid=accident-location-options]'),
  reasonOptions: () => cy.get('[data-testid=accident-reason-options]'),
  backgroundOptions: () => cy.get('[data-testid=accident-background-options]')
}
