import { companyForm } from "../support/selectors/company-form.selectors";
import { info } from "../support/selectors/info.selectors";
import { general } from "../support/selectors/general-form.selector";
import { timeframeForm } from "../support/selectors/timeframe-form.selector";
import { endpointUrls } from "../support/utils/endpointUrls";
import { network } from "../support/utils/network";

import * as dayjs from 'dayjs'
import { injuredForm } from "../support/selectors/injured-form.selectors";
import { accidentForm } from "../support/selectors/accident-form.selectors";
import { injuryForm } from "../support/selectors/injury-form.selectors";
import { summary } from "../support/selectors/summary.selectors";
import { receipt } from "../support/selectors/receipt.selectors";
import { Tid } from '../../../client/src/api/yrkesskade';
interface TestSkademelding {
  innmeldernavn: string;
  virksomhetsnavn: string;
  tidstype: Tid.tidstype;
  tidspunkt?: dayjs.Dayjs;
  stilling: string;
  skadelidtIdentifikator: string,
  fra?: Date;
  til?: Date;
  timeframe: string;
  aarsak: string;
  bakgrunn: string;
  kroppsdel: string;
  skadetype: string;
}

describe('Skjema innsending', (): void => {

  const test: TestSkademelding = {
    innmeldernavn: 'ROLF BJØRN',
    virksomhetsnavn: 'BIRI OG TORPO REGNSKAP',
    stilling: 'Administrerende direktører',
    skadelidtIdentifikator: '16120101181',
    tidstype: Tid.tidstype.TIDSPUNKT,
    tidspunkt: dayjs(),
    timeframe: 'I avtalt arbeidstid',
    aarsak: 'Trafikkulykke',
    bakgrunn: 'Manglende merking',
    kroppsdel: 'Øye, venstre',
    skadetype: 'Tap av legemsdel',
  }

  beforeEach(() => {
    network.intercept(endpointUrls.toggle, 'toggles/enabled.json').as('toggles');
    network.intercept(endpointUrls.innlogget, 'innlogget.json').as('getInnlogget');
    network.intercept(endpointUrls.brukerinfo, 'brukerinfo/brukerinfo.json').as('brukerinfo');
    network.intercept(endpointUrls.brukerinfoOrganisasjon, 'brukerinfo/organisasjoner/910437127.json').as('getOrganisasjon');
    network.intercept(endpointUrls.brukerinfoRoller, 'brukerinfo/roller.json').as('getRoller');
    network.intercept(endpointUrls.skademelding, 'skademelding.json').as('postSkademelding');
    network.intercept(endpointUrls.print, 'skademelding-kopi.pdf').as('postPrintPdf');
    network.intercept(endpointUrls.log, 'logResult.json').as('postLog');
    network.intercept(endpointUrls.amplitude, '').as('amplitude');

    ['landkoderISO2', 'rolletype'].forEach(kodeverk => {
      network.intercept(endpointUrls.kodeverkUtenKategori(kodeverk), `kodeverk/${kodeverk}.json`);
    });

    ['stillingstittel', 'aarsakOgBakgrunn', 'alvorlighetsgrad', 'bakgrunnForHendelsen', 'fravaertype', 'hvorSkjeddeUlykken', 'harSkadelidtHattFravaer', 'skadetKroppsdel', 'skadetype', 'tidsrom', 'typeArbeidsplass'].forEach(kodeverk => {
      network.intercept(endpointUrls.kodeverk(kodeverk), `kodeverk/${kodeverk}.json`);
    })

    cy.window().then(win=> {
      win.sessionStorage.removeItem('__LSM__');

      cy.visit('');
      cy.location().should('to.be', 'http://localhost:3001/yrkesskade/')
    });

  });

  it('normal flyt - ingen avvik', () => {
    const injuryTime = test.tidspunkt;
    // vent til innlogget sjekk er fullført
    cy.wait('@getInnlogget').wait('@postLog').wait('@getLandkoder').wait('@getRoller');

    // start innmelding
    info.startInnmelding().click();

    // info om skadelydte
    injuredForm.idNumber().type(`{selectAll}${test.skadelidtIdentifikator}`);
    injuredForm.positionSelect().select(1);
    injuredForm.position().type(`${test.stilling}{enter}`);

    // Gå til neste steg
    general.nextStep().click();

     // velg tidspunkt
    timeframeForm.timeframeWhenDate().clear().type(injuryTime.format('DD.MM.YYYY')).type('{enter}');
    timeframeForm.timeframeWhenTime().type(injuryTime.format('HH:mm')).type('{enter}'); // ser ikke ut som den liker at dette felter skrives til
    timeframeForm.timeframePeriodOptions().select(test.timeframe);

    // Gå til neste steg
    general.nextStep().click();

    // info om ulykken
    accidentForm.place().select(1);
    accidentForm.placeType().select(2);
    accidentForm.reasonOptions().type(`${test.aarsak}{enter}{esc}`);
    accidentForm.backgroundOptions().type(`${test.bakgrunn}{enter}{esc}`)

    // Gå til neste steg
    general.nextStep().click();

    // info om skaden
    injuryForm.bodylocationOptions().select(test.kroppsdel);
    injuryForm.injuryTypeOptions().select(test.skadetype);
    injuryForm.addInjuryButton().click();
    injuryForm.injuryAbsentRadio(2).click();

    // Gå til neste steg
    general.nextStep().click();

    // Gå til neste steg
    general.nextStep().click();

    // validerer oppsummering
    summary.accordians.innmelder().click();
    summary.innmelder.navn().should('have.text', test.innmeldernavn); // se i fixtures/brukerinfo.json
    summary.innmelder
      .virksomhetsnavn().should('have.text', test.virksomhetsnavn); // se 1 organisasjon i fixtures/brukerinfo.json

    // send inn skjema
    summary.sendInjury().click().wait('@postSkademelding');

    cy.location().should((location) => {
      expect(location.pathname).to.contain('/skjema/kvittering');
    });

    receipt.print().click().wait('@postPrintPdf');
  });

  it('legg til skader, angre og fjern enkelte skader', () => {
    const injuryTime = test.tidspunkt;
    // vent til innlogget sjekk er fullført
    cy.wait('@getInnlogget');

    // start innmelding
    info.startInnmelding().click();

    // info om skadelydte
    injuredForm.idNumber().type(`{selectAll}${test.skadelidtIdentifikator}`);
    injuredForm.positionSelect().select(1);
    injuredForm.position().type(`${test.stilling}{enter}`);

    // Gå til neste steg
    general.nextStep().click();

     // velg tidspunkt
    timeframeForm.timeframeWhenDate().clear().type(injuryTime.format('DD.MM.YYYY')).type('{enter}');
    timeframeForm.timeframeWhenTime().type('{selectall}' + injuryTime.format('HH:mm')).type('{enter}'); // ser ikke ut som den liker at dette felter skrives til
   // timeframeForm.timeframeWhenTime().click();
   // timeframeForm.timeframeWhenTimeSelect(13).click();
    timeframeForm.timeframePeriodOptions().select(test.timeframe);

    // Gå til neste steg
    general.nextStep().click();

    // info om ulykken
    accidentForm.place().select(1);
    accidentForm.placeType().select(2);
    accidentForm.reasonOptions().type(`${test.aarsak}{enter}{esc}`);
    accidentForm.backgroundOptions().type(`${test.bakgrunn}{enter}{esc}`)

    // Gå til neste steg
    general.nextStep().click();

    // info om skaden
    injuryForm.bodylocationOptions().select(test.kroppsdel);
    injuryForm.injuryTypeOptions().select(test.skadetype);
    injuryForm.addInjuryButton().click();
    injuryForm.injuryAbsentRadio(2).click();


    // Gå til neste steg
    general.nextStep().click();

    // Gå til neste steg
    general.nextStep().click();

    // validerer oppsummering
    summary.accordians.skade().click();
    summary.skade.rader().should('have.length', 1);

    // gå tilbake og legg til 1 nye skade
    general.backStep().click();
    general.backStep().click();

    injuryForm.addInjuryButton().click();

    // legg til skade nr 2
    injuryForm.bodylocationOptions().select('Hode');
    injuryForm.injuryTypeOptions().select('Sårskade');
    injuryForm.addInjuryButton().click();

    // legg til skade nr 3
    injuryForm.bodylocationOptions().select('Hode');
    injuryForm.injuryTypeOptions().select('Bruddskade');

    // Gå til neste steg
    general.nextStep().click();

    // Gå til neste steg
    general.nextStep().click();

    // validerer oppsummering
    summary.accordians.skade().click();
    summary.skade.rader().should('have.length', 3);

    // gå tilbake og fjern 1 skade
    general.backStep().click();
    general.backStep().click();

    injuryForm.removeInjuryButton(1).click();

    // Gå til neste steg
    general.nextStep().click();

    // Gå til neste steg
    general.nextStep().click();

    // validerer oppsummering
    summary.accordians.skade().click();
    summary.skade.rader().should('have.length', 2);

    // send inn skjema
    summary.sendInjury().click().wait('@postSkademelding');

    cy.location().should((location) => {
      expect(location.pathname).to.contain('/skjema/kvittering');
    });

  })

  it.skip('normal flyt - sjekk validering av felter', () => {
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

