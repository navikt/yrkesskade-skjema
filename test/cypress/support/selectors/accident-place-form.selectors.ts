export const accidentPlaceForm = {
  place: () => cy.get('[data-testid=accident-place]'),
  placeType: () => cy.get('[data-testid=accident-place-type]'),
  locationOptions: () => cy.get('[data-testid=accident-location-options]'),

}
