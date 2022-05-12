export const summary = {
  sendInjury: () => cy.get('[data-testid=send-injuryform]'),
  accordians: {
    innmelder: () => cy.get('[data-testid="oppsummering-accordian-innmelder"] > button'),
    skade: () => cy.get('[data-testid="oppsummering-accordian-skade"] > button')
  },
  innmelder: {
    navn: () => cy.get('[data-testid="summary-name"]'),
    virksomhetsnavn: () => cy.get('[data-testid="summary-company-name"]')
  },
  skade: {
    rader: () => cy.get('[data-testid="skade-tabell-rad"]')
  }

}
