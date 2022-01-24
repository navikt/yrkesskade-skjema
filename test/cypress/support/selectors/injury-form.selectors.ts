export const injuryForm = {
  bodylocationOptions: () => cy.get('[data-testid=injury-body-location-options]'),
  injuryTypeOptions: () => cy.get('[data-testid=injury-type-options]'),
  medicalContacted: {
    yesOption: () => cy.get('[data-testid=injury-medical-contacted-yes-option]'),
    noOption: () => cy.get('[data-testid=injury-medical-contacted-no-option]'),
    unknownOption: () => cy.get('[data-testid=injury-medical-contacted-unknown-option]'),
  },
  additionalInformation: () => cy.get('[data-testid=injury-additional-information]')
}
