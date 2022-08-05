export const accidentForm = {
  severityOptions: () => cy.get('[data-testid=accident-severity-options]'),
  locationOptions: () => cy.get('[data-testid=accident-location-options]'),
  reasonOptions: () => cy.get('.aarsak-ulykke-tabell-a-e input'),
  backgroundOptions: () => cy.get('.bakgrunnsaarsak-b-g input'),
  fjernBakgrunnAarsak: (valg: String) => cy.get(`.bakgrunnsaarsak-b-g [aria-label="Remove ${valg}"]`),
  place: () => cy.get('[data-testid=accident-place]'),
  placeType: () => cy.get('[data-testid=accident-place-type]'),
  paavirkningsform: () => cy.get('.paavirkningsform-b-g input'),
  fjernPaavirkingsformKnapp: (valg: String) => cy.get(`.paavirkningsform-b-g [aria-label="Remove ${valg}"]`)
}
