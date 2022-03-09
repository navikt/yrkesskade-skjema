import { companyForm } from "../support/selectors/company-form.selectors";
import { info } from "../support/selectors/info.selectors";
import { general } from "../support/selectors/general-form.selector";
import { timeframeForm } from "../support/selectors/timeframe-form.selector";
import { endpointUrls } from "../support/utils/endpointUrls";
import { network } from "../support/utils/network";

import * as dayjs from 'dayjs'
import { homeForm } from "../support/selectors/home-fom.selectors";
import { injuredForm } from "../support/selectors/injured-form.selectors";
import { accidentForm } from "../support/selectors/accident-form.selectors";
import { injuryForm } from "../support/selectors/injury-form.selectors";
import { summary } from "../support/selectors/summary.selectors";

describe('Skjema innsending', (): void => {

  beforeEach(() => {
    network.intercept(endpointUrls.toggle, 'toggles/enabled.json').as('toggles');
    network.intercept(endpointUrls.innlogget, 'innlogget.json').as('getInnlogget');
    network.intercept(endpointUrls.brukerinfo, 'brukerinfo/brukerinfo.json').as('brukerinfo');
    network.intercept(endpointUrls.brukerinfoOrganisasjon, 'brukerinfo/organisasjoner/910437127.json').as('getOrganisasjon');
    network.intercept(endpointUrls.skademelding, 'skademelding.json').as('postSkademelding');
   // network.intercept(endpointUrls.log, 'logResult.json').as('postLog');

    cy.visit('');
    cy.location().should('to.be', 'http://localhost:3001/yrkesskade/')
  });

  it('normal flyt - ingen avvik', () => {
    const injuryTime = dayjs();
    // vent til innlogget sjekk er fullført
    cy.wait('@getInnlogget');

    // start innmelding
    info.startInnmelding().click();

    // velg tidspunkt
    timeframeForm.timeframeWhenDate().clear().type(injuryTime.format('DD.MM.YYYY')).type('{enter}');
    timeframeForm.timeframeWhenTime().type('{selectall}' + injuryTime.format('HH:mm')).type('{enter}'); // ser ikke ut som den liker at dette felter skrives til
   // timeframeForm.timeframeWhenTime().click();
   // timeframeForm.timeframeWhenTimeSelect(13).click();
    timeframeForm.timeframePeriodOptions().select('I avtalt arbeidstid');

    // Gå til neste steg
    general.nextStep().click();

    // info om skadelydte
    // injuredForm.roleOptions().select('Rolle');
    injuredForm.position().type('Programvareutviklere{enter}');
    injuredForm.idNumber().type('16120101181');

    // Gå til neste steg
    general.nextStep().click();

    // info om ulykken
    accidentForm.place().select(1);
    accidentForm.placeType().select(2);
    accidentForm.reasonOptions().type('Trafikkulykke{enter}{esc}');
    accidentForm.backgroundOptions().type('Manglende merking{enter}{esc}')

    // Gå til neste steg
    general.nextStep().click();

    // info om skaden
    injuryForm.bodylocationOptions().select('Øye, venstre');
    injuryForm.injuryTypeOptions().select('Tap av legemsdel');
    injuryForm.addInjuryButton().click();
    injuryForm.injuryAbsentRadio(2).click();

    // Gå til neste steg
    general.nextStep().click();

    // Gå til neste steg
    general.nextStep().click();

    // send inn skjema
    summary.sendInjury().click().wait('@postSkademelding');

    cy.location().should((location) => {
      expect(location.pathname).to.contain('/skjema/kvittering');
    });
  });

  it('normal flyt - sjekk validering av felter', () => {
    const injuryTime = dayjs();
    // vent til innlogget sjekk er fullført
    cy.wait('@getInnlogget');

    // start innmelding
    info.startInnmelding().click();

    general.nextStep().click();

    general.feilmeldinger().should('have.length', 2);

    // valider
    timeframeForm.timeframeWhenDate().clear().type(injuryTime.format('DD.MM.YYYY')).type('{enter}');
    timeframeForm.timeframeWhenTime().type('{selectall}' + injuryTime.format('HH:mm')).type('{enter}'); // ser ikke ut som den liker at dette felter skrives til

    general.nextStep().click();

    general.feilmeldinger().should('have.length', 1);

    timeframeForm.timeframePeriodOptions().select('I avtalt arbeidstid');

    general.nextStep().click();

    cy.location().should((location) => {
      expect(location.pathname).to.contain('/skjema/skadelidt');
    });

    general.nextStep().click();

    general.feilmeldinger().should('have.length', 2);

    injuredForm.position().type('Programvareutviklere{enter}');

    general.nextStep().click();

    general.feilmeldinger().should('have.length', 1);
  });

});

