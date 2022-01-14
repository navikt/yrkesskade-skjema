import { companyForm } from "../support/selectors/company-form.selectors";
import { info } from "../support/selectors/info.selectors";
import { timeframeForm } from "../support/selectors/timeframe-form.selector";
import { endpointUrls } from "../support/utils/endpointUrls";
import { network } from "../support/utils/network";

import * as dayjs from 'dayjs'

describe('Skjema innsending', (): void => {

  beforeEach(() => {
    cy.visit('');
    cy.location().should('to.be', 'http://localhost:3001/yrkesskade/')

    network.intercept(endpointUrls.innlogget).as('getInnlogget');
  });

  it('normal flyt - ingen avvik', () => {
    const injuryTime = dayjs();
    // vent til innlogget sjekk er fullført
    cy.wait('@getInnlogget');

    // start innmelding
    info.startInnmelding().click();

    // samme selskap
    companyForm.companyOptionYes().click();
    companyForm.companyOptionNo().click();

    // velg tidspunkt
    timeframeForm.timeframeWhenDate().type(injuryTime.format('DD.MM.YYYY'));
    timeframeForm.timeframeWhenTime().type(injuryTime.format('HH:mm'));
  });
});

