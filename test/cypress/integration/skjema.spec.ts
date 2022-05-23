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
  stilling?: string;
  skadelidtIdentifikator: string,
  fra?: dayjs.Dayjs;
  til?: dayjs.Dayjs;
  timeframe: string;
  aarsak: string;
  bakgrunn: string;
  kroppsdel: string;
  skadetype: string;
}

describe('Skjema innsending', (): void => {

  const arbeidstaker: TestSkademelding = {
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

  const elev: TestSkademelding = {
    innmeldernavn: 'ROLF BJØRN',
    virksomhetsnavn: 'BIRI OG TORPO REGNSKAP',
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
    network.intercept(endpointUrls.brukerinfoOrganisasjon('910437127'), 'brukerinfo/organisasjoner/910437127.json').as('getOrganisasjon');
    network.intercept(endpointUrls.brukerinfoRoller('910437127'), 'brukerinfo/roller.json').as('getRoller');
    network.intercept(endpointUrls.skademelding, 'skademelding.json').as('postSkademelding');
    network.intercept(endpointUrls.print, 'skademelding-kopi.pdf').as('postPrintPdf');
    network.intercept(endpointUrls.log, 'logResult.json').as('postLog');
    network.intercept(endpointUrls.amplitude, 'amplitude.json').as('amplitude');

    ['landkoderISO2', 'rolletype'].forEach(kodeverk => {
      network.intercept(endpointUrls.kodeverkUtenKategori(kodeverk), `kodeverk/${kodeverk}.json`).as(kodeverk);
    });

    ['stillingstittel', 'aarsakOgBakgrunn', 'alvorlighetsgrad', 'bakgrunnForHendelsen', 'fravaertype', 'hvorSkjeddeUlykken', 'harSkadelidtHattFravaer', 'skadetKroppsdel', 'skadetype', 'tidsrom', 'typeArbeidsplass'].forEach(kodeverk => {
      network.intercept(endpointUrls.kodeverk(kodeverk), `kodeverk/${kodeverk}.json`).as(kodeverk);
    })

    cy.window().then(win=> {
      win.sessionStorage.removeItem('__LSM__');

      cy.visit('');
      cy.location().should('to.be', 'http://localhost:3001/yrkesskade/')
    });

  });

  it('arbeidstaker - tidstype tidspunkt - ingen avvik', () => {
    const injuryTime = arbeidstaker.tidspunkt;
    // vent til innlogget sjekk er fullført
    cy.wait('@getInnlogget').wait('@getOrganisasjon').wait('@getRoller');

    // start innmelding
    info.startInnmelding().click();

    // sjekk validering
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 2);

    // info om skadelidte
    injuredForm.idNumber().type(`{selectAll}${arbeidstaker.skadelidtIdentifikator}`);
    injuredForm.positionSelect().select(1);

    // valider stillingstittel
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 1);

    injuredForm.position().type(`${arbeidstaker.stilling}{enter}`);

    cy.wait('@stillingstittel').wait('@bakgrunnForHendelsen')

    // Gå til neste steg
    general.nextStep().click();

    // velg tidspunkt
    // sjekk validering
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 2);
    timeframeForm.timeframeWhenDate().clear().type(injuryTime.format('DD.MM.YYYY')).type('{enter}');
    timeframeForm.timeframeWhenTime().type(injuryTime.format('HH:mm')).type('{enter}'); // ser ikke ut som den liker at dette felter skrives til
    timeframeForm.timeframePeriodOptions().select(arbeidstaker.timeframe);

    // Gå til neste steg
    general.nextStep().click();

    // info om ulykken
    // sjekk validering
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 4);
    accidentForm.place().select(1);
    accidentForm.placeType().select(2);
    accidentForm.reasonOptions().type(`${arbeidstaker.aarsak}{enter}{esc}`);
    accidentForm.backgroundOptions().type(`${arbeidstaker.bakgrunn}{enter}{esc}`)

    // Gå til neste steg
    general.nextStep().click();

    // info om skaden
    // sjekk validering
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 1);
    injuryForm.injuryAbsentRadio(2).click();

    general.nextStep().click();
    general.feilmeldinger().should('have.length', 1);
    injuryForm.bodylocationOptions().select(arbeidstaker.kroppsdel);
    injuryForm.injuryTypeOptions().select(arbeidstaker.skadetype);
    injuryForm.addInjuryButton().click();


    // Gå til neste steg
    general.nextStep().click();

    // Gå til neste steg
    general.nextStep().click();

    // validerer oppsummering
    summary.accordians.innmelder().click();
    summary.innmelder.navn().should('have.text', arbeidstaker.innmeldernavn); // se i fixtures/brukerinfo.json
    summary.innmelder
      .virksomhetsnavn().should('have.text', arbeidstaker.virksomhetsnavn); // se 1 organisasjon i fixtures/brukerinfo.json

    // send inn skjema
    summary.sendInjury().click().wait('@postSkademelding');

    cy.location().should((location) => {
      expect(location.pathname).to.contain('/skjema/kvittering');
    });

    receipt.print().click().wait('@postPrintPdf');
  });

  it('arbeidstaker - tidstype periode - ingen avvik', () => {
    const testdata: TestSkademelding = {
      innmeldernavn: 'ROLF BJØRN',
      virksomhetsnavn: 'BIRI OG TORPO REGNSKAP',
      stilling: 'Administrerende direktører',
      skadelidtIdentifikator: '16120101181',
      tidstype: Tid.tidstype.PERIODE,
      fra: dayjs().add(-4, 'day'),
      til: dayjs(),
      timeframe: 'I avtalt arbeidstid',
      aarsak: 'Trafikkulykke',
      bakgrunn: 'Manglende merking',
      kroppsdel: 'Øye, venstre',
      skadetype: 'Tap av legemsdel',
    }

    // vent til innlogget sjekk er fullført
    cy.wait('@getInnlogget').wait('@getOrganisasjon').wait('@getRoller');

    // start innmelding
    info.startInnmelding().click();

    // info om skadelydte
    injuredForm.idNumber().type(`{selectAll}${arbeidstaker.skadelidtIdentifikator}`);
    injuredForm.positionSelect().select(1);
    injuredForm.position().type(`${arbeidstaker.stilling}{enter}`);

    // Gå til neste steg
    general.nextStep().click();

    // velg tidspunkt
    cy.location().should('to.be', '/yrkesskade/skjema/tidsrom');
    timeframeForm.timeframeWhenOverPeriod().click();
    timeframeForm.timeframePeriodOptions().select(arbeidstaker.timeframe);

    general.nextStep().click();
    // validering feilet -  skal være på samme side
    general.feilmeldinger().should('have.length', 2);
    timeframeForm.timeframePeriodFromDate().type(testdata.fra.format('DD.MM.YYYY')).type('{enter}');
    timeframeForm.timeframePeriodToDate().type(testdata.til.format('DD.MM.YYYY')).type('{enter}');

    // Gå til neste steg
    general.nextStep().click();

    // info om ulykken
    accidentForm.place().select(1);
    accidentForm.placeType().select(2);
    accidentForm.reasonOptions().type(`${arbeidstaker.aarsak}{enter}{esc}`);
    accidentForm.backgroundOptions().type(`${arbeidstaker.bakgrunn}{enter}{esc}`)

    // Gå til neste steg
    general.nextStep().click();

    // info om skaden
    injuryForm.bodylocationOptions().select(arbeidstaker.kroppsdel);
    injuryForm.injuryTypeOptions().select(arbeidstaker.skadetype);
    injuryForm.addInjuryButton().click();
    injuryForm.injuryAbsentRadio(2).click();

    // Gå til neste steg
    general.nextStep().click();

    // Gå til neste steg
    general.nextStep().click();

    // validerer oppsummering
    summary.accordians.innmelder().click();
    summary.innmelder.navn().should('have.text', arbeidstaker.innmeldernavn); // se i fixtures/brukerinfo.json
    summary.innmelder
      .virksomhetsnavn().should('have.text', arbeidstaker.virksomhetsnavn); // se 1 organisasjon i fixtures/brukerinfo.json
    summary.accordians.tidOgSted().click();
    summary.tidOgSted.tid().should('have.text', `${testdata.fra.format('DD.MM.YYYY')} - ${testdata.til.format('DD.MM.YYYY')}`);

    // send inn skjema
    summary.sendInjury().click().wait('@postSkademelding');

    cy.location().should((location) => {
      expect(location.pathname).to.contain('/skjema/kvittering');
    });

  });

  it.only('elev - tidstype tidspunkt - ingen avvik', () => {
    const injuryTime = elev.tidspunkt;
    // vent til innlogget sjekk er fullført
    cy.wait('@getInnlogget').wait('@getOrganisasjon').wait('@getRoller');

    // start innmelding
    info.startInnmelding().click();

    // sjekk validering
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 2);

    // info om skadelidte
    injuredForm.idNumber().type(`{selectAll}${elev.skadelidtIdentifikator}`);
    injuredForm.positionSelect().select(2);

    // Gå til neste steg
    general.nextStep().click();

    // velg tidspunkt
    // sjekk validering
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 2);
    timeframeForm.timeframeWhenDate().clear().type(injuryTime.format('DD.MM.YYYY')).type('{enter}');
    timeframeForm.timeframeWhenTime().type(injuryTime.format('HH:mm')).type('{enter}'); // ser ikke ut som den liker at dette felter skrives til
    timeframeForm.timeframePeriodOptions().select(elev.timeframe);

    // Gå til neste steg
    general.nextStep().click();

    // info om ulykken
    // sjekk validering
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 2);
    accidentForm.place().select(1);
    accidentForm.reasonOptions().type(`${elev.aarsak}{enter}{esc}`);

    // Gå til neste steg
    general.nextStep().click();

    // info om skaden
    // sjekk validering
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 1);
    injuryForm.bodylocationOptions().select(elev.kroppsdel);
    injuryForm.injuryTypeOptions().select(elev.skadetype);
    injuryForm.addInjuryButton().click();


    // Gå til neste steg
    general.nextStep().click();

    // Gå til neste steg
    general.nextStep().click();

    // validerer oppsummering
    summary.accordians.innmelder().click();
    summary.innmelder.navn().should('have.text', elev.innmeldernavn); // se i fixtures/brukerinfo.json
    summary.innmelder
      .virksomhetsnavn().should('have.text', elev.virksomhetsnavn); // se 1 organisasjon i fixtures/brukerinfo.json

    // send inn skjema
    summary.sendInjury().click().wait('@postSkademelding');

    cy.location().should((location) => {
      expect(location.pathname).to.contain('/skjema/kvittering');
    });
  });

  it('legg til skader, angre og fjern enkelte skader', () => {
    const injuryTime = arbeidstaker.tidspunkt;
    // vent til innlogget sjekk er fullført
    cy.wait('@getInnlogget').wait('@getOrganisasjon').wait('@getRoller');

    // start innmelding
    info.startInnmelding().click();

    // info om skadelydte
    injuredForm.idNumber().type(`{selectAll}${arbeidstaker.skadelidtIdentifikator}`);
    injuredForm.positionSelect().select(1);
    injuredForm.position().type(`${arbeidstaker.stilling}{enter}`);

    // Gå til neste steg
    general.nextStep().click();

     // velg tidspunkt
    timeframeForm.timeframeWhenDate().clear().type(injuryTime.format('DD.MM.YYYY')).type('{enter}');
    timeframeForm.timeframeWhenTime().type('{selectall}' + injuryTime.format('HH:mm')).type('{enter}'); // ser ikke ut som den liker at dette felter skrives til
   // timeframeForm.timeframeWhenTime().click();
   // timeframeForm.timeframeWhenTimeSelect(13).click();
    timeframeForm.timeframePeriodOptions().select(arbeidstaker.timeframe);

    // Gå til neste steg
    general.nextStep().click();

    // info om ulykken
    accidentForm.place().select(1);
    accidentForm.placeType().select(2);
    accidentForm.reasonOptions().type(`${arbeidstaker.aarsak}{enter}{esc}`);
    accidentForm.backgroundOptions().type(`${arbeidstaker.bakgrunn}{enter}{esc}`)

    // Gå til neste steg
    general.nextStep().click();

    // diverse valideringsjekker
    general.nextStep().click(); // prøv å gå til neste side
    injuryForm.injuryAbsentRadio(2).click(); // legg til fravaer og gå til neste side
    general.nextStep().click();

    // legg til en av to verdier
    injuryForm.bodylocationOptions().select(arbeidstaker.kroppsdel);
    injuryForm.addInjuryButton().click();
    injuryForm.injuredParts().should('have.length', 0);
    general.nextStep().click();

    // info om skaden
    injuryForm.bodylocationOptions().select(arbeidstaker.kroppsdel);
    injuryForm.injuryTypeOptions().select(arbeidstaker.skadetype);
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

});

