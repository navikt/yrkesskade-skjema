export const summary = {
  sendInjury: () => cy.get('[data-testid=send-injuryform]'),
  accordians: {
    innmelder: () => cy.get('[data-testid="oppsummering-accordian-innmelder"] > button'),
    skade: () => cy.get('[data-testid="oppsummering-accordian-skade"] > button'),
    tidOgSted: () => cy.get('[data-testid="oppsummering-accordian-tid-og-sted"]'),
    hendelsen: () => cy.get('[data-testid="oppsummering-hendelsen"]')
  },
  innmelder: {
    navn: () => cy.get('[data-testid="summary-name"]'),
    virksomhetsnavn: () => cy.get('[data-testid="summary-company-name"]')
  },
  skade: {
    rader: () => cy.get('[data-testid="skade-tabell-rad"]')
  },
  tidOgSted: {
    tid: () => cy.get('[data-testid="summary-time"]'),
    perioder: () => cy.get('[data-testid="sammendrag-periode-rad"]')
  },
  hendelsen: {
    paavirkningsformer: () => cy.get('[data-testid="oppsummering-paavirkningsformer"]')
  }
}
