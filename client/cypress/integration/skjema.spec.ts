import { endpointUrls } from "../support/utils/endpointUrls";
import { network } from "../support/utils/network";

describe('Skjema innsending', (): void => {

  beforeEach(() => {
    cy.visit('');

    network.intercept(endpointUrls.innlogget, 'fixture:innlogget.json').as('getInnlogget');
  })

  it('works', () => {
    //cy.location().should('be', 'http://localhost:3001/');
    cy.wait('@getInnlogget');
  })
})
