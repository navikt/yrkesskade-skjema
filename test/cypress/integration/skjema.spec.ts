import { companyForm } from "../support/selectors/company-form.selectors";
import { info } from "../support/selectors/info.selectors";
import { timeframeForm } from "../support/selectors/timeframe-form.selector";
import { endpointUrls } from "../support/utils/endpointUrls";
import { network } from "../support/utils/network";

import * as dayjs from 'dayjs'
import { homeForm } from "../support/selectors/home-fom.selectors";
import { injuredForm } from "../support/selectors/injured-form.selectors";
import { accidentForm } from "../support/selectors/accident-form.selectors";
import { injuryForm } from "../support/selectors/injury-form.selectors";

describe('Skjema innsending', (): void => {

  beforeEach(() => {
    cy.visit('');
    cy.location().should('to.be', 'http://localhost:3001/yrkesskade/')

    network.intercept(endpointUrls.innlogget, 'innlogget.json').as('getInnlogget');
    network.intercept(endpointUrls.skademelding, 'skademelding.json').as('postSkademelding');
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
    timeframeForm.timeframePeriodOptions().select('I avtalt arbeidstid');

    // info om skadelydte
    // injuredForm.roleOptions().select('Rolle');
    injuredForm.position().type('Tastaturkriger');
    injuredForm.idNumber().type('01011050433');

    // info om ulykken
    accidentForm.severityOptions().select('Veldig');
    accidentForm.locationOptions().select('1');
    accidentForm.reasonOptions().select('Støt/treff av gjenstand');
    accidentForm.backgroundOptions().select('Manglende merking, varsling, skilting');

    // info om skaden
    injuryForm.bodylocationOptions().select('Øye, venstre');
    injuryForm.injuryTypeOptions().select('Tap av legemsdel');
    injuryForm.medicalContacted.noOption().click();

    // send inn skjema
    homeForm.continue().click();

    cy.location().should((location) => {
      expect(location.pathname).to.contain('/skjema/oppsumering');
    });
  });
});

