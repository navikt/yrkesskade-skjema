import { info } from '../support/selectors/info.selectors';
import { general } from '../support/selectors/general-form.selector';
import { timeframeForm } from '../support/selectors/timeframe-form.selector';
import { endpointUrls } from '../support/utils/endpointUrls';
import { network } from '../support/utils/network';

import * as dayjs from 'dayjs';
import { injuredForm } from '../support/selectors/injured-form.selectors';
import { accidentForm } from '../support/selectors/accident-form.selectors';
import { accidentPlaceForm } from '../support/selectors/accident-place-form.selectors';
import { injuryForm } from '../support/selectors/injury-form.selectors';
import { summary } from '../support/selectors/summary.selectors';
import { receipt } from '../support/selectors/receipt.selectors';
import { Tid } from '../../../client/src/api/yrkesskade';
interface TestSkademelding {
  innmeldernavn: string;
  virksomhetsnavn: string;
  tidstype: Tid.tidstype;
  tidspunkt?: dayjs.Dayjs;
  stilling?: string;
  skadelidtIdentifikator: string;
  fra?: dayjs.Dayjs;
  til?: dayjs.Dayjs;
  sykdomPaavist?: dayjs.Dayjs;
  timeframe: string;
  aarsak?: string;
  bakgrunn?: string;
  kroppsdel: string;
  skadetype: string;
  paavirkningsform?: string[];
  tjenestefra?: dayjs.Dayjs;
  tjenestetil?: dayjs.Dayjs;
  tjenesteavdeling?: string;
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
  };

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
  };

  const førstegangstjeneste: TestSkademelding = {
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
    tjenestefra: dayjs().add(-4, 'day'),
    tjenestetil: dayjs(),
    tjenesteavdeling: "Førstegangstjeneste"

  };

  const felleskoder = ['landkoderISO2', 'rolletype', 'paavirkningsform', 'sykdomstype'];

  beforeEach(() => {
    network.intercept(endpointUrls.toggle, 'toggles/enabled.json').as('toggles');
    network.intercept(endpointUrls.innlogget, 'brukerinfo/brukerinfo.json').as('getInnlogget');
    network.intercept(endpointUrls.brukerinfo, 'brukerinfo/brukerinfo.json').as('brukerinfo');
    network.intercept(endpointUrls.brukerinfoOrganisasjon('910437127'), 'brukerinfo/organisasjoner/910437127.json').as('getOrganisasjon');
    network.intercept(endpointUrls.brukerinfoRoller('910437127'), 'brukerinfo/roller.json').as('getRoller');
    network.intercept(endpointUrls.skademelding, 'skademelding.json').as('postSkademelding');
    network.intercept(endpointUrls.print, 'skademelding-kopi.pdf').as('postPrintPdf');
    network.intercept(endpointUrls.log, 'logResult.json').as('postLog');
    network.intercept(endpointUrls.amplitude, 'amplitude.json').as('amplitude');

    felleskoder.forEach((kodeverk) => {
      network
        .intercept(
          endpointUrls.kodeverkUtenKategori(kodeverk),
          `kodeverk/${kodeverk}.json`
        )
        .as(kodeverk);
    });

    [
      'stillingstittel',
      'aarsakOgBakgrunn',
      'alvorlighetsgrad',
      'bakgrunnForHendelsen',
      'fravaertype',
      'hvorSkjeddeUlykken',
      'harSkadelidtHattFravaer',
      'skadetKroppsdel',
      'skadetype',
      'tidsrom',
      'typeArbeidsplass',
    ].forEach((kodeverk) => {
      network
        .intercept(endpointUrls.kodeverk(kodeverk), `kodeverk/${kodeverk}.json`)
        .as(kodeverk);
    });

    cy.window().then(win=> {
      win.sessionStorage.removeItem('persist:root');
      cy.visit('');
      cy.location().should('to.be', 'http://localhost:3001/yrkesskade/');

      felleskoder.forEach((kodeverk) => cy.wait(`@${kodeverk}`));
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
    injuredForm
      .idNumber()
      .type(`{selectAll}${arbeidstaker.skadelidtIdentifikator}`);
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
    timeframeForm
      .timeframeWhenDate()
      .clear()
      .type(injuryTime.format('DD.MM.YYYY'))
      .type('{enter}');
    timeframeForm
      .timeframeWhenTime()
      .type(injuryTime.format('HH:mm'))
      .type('{enter}'); // ser ikke ut som den liker at dette felter skrives til
    timeframeForm.timeframePeriodOptions().select(arbeidstaker.timeframe);

    // Gå til neste steg
    general.nextStep().click();

    // info om ulykkessted
    // sjekk validering
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 2);
    accidentPlaceForm.place().select(1);
    accidentPlaceForm.placeType().select(2);

    // Gå til neste steg
    general.nextStep().click();

    // info om ulykken
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 2);
    accidentForm.reasonOptions().type(`${arbeidstaker.aarsak}{enter}{esc}`);
    accidentForm
      .backgroundOptions()
      .type(`${arbeidstaker.bakgrunn}{enter}{esc}`);

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
      .virksomhetsnavn()
      .should('have.text', arbeidstaker.virksomhetsnavn); // se 1 organisasjon i fixtures/brukerinfo.json

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
      kroppsdel: 'Øye, venstre',
      skadetype: 'Tap av legemsdel',
      paavirkningsform: ['Kjemikalier, løsemidler, gift, gass, væske o.l.', 'Vibrasjon']
    };

    // vent til innlogget sjekk er fullført
    cy.wait('@getInnlogget').wait('@getOrganisasjon').wait('@getRoller');

    // start innmelding
    info.startInnmelding().click();

    // info om skadelydte
    injuredForm
      .idNumber()
      .type(`{selectAll}${arbeidstaker.skadelidtIdentifikator}`);
    injuredForm.positionSelect().select(1);
    injuredForm.position().type(`${arbeidstaker.stilling}{enter}`);

    // Gå til neste steg
    general.nextStep().click();

    // velg tidspunkt
    cy.location().should('to.be', '/yrkesskade/skjema/tidsrom');
    timeframeForm.timeframeWhenOverPeriod().click();

    general.nextStep().click();
    // validering feilet -  skal være på samme side
    general.feilmeldinger().should('have.length', 2);
    timeframeForm
      .timeframePeriodFromDate()
      .type(testdata.fra.format('DD.MM.YYYY'))
      .type('{enter}');
    timeframeForm
      .timeframePeriodToDate()
      .type(testdata.til.format('DD.MM.YYYY'))
      .type('{enter}');

    timeframeForm.timeframePeriodOptions().select(arbeidstaker.timeframe);

    // Gå til neste steg
    general.nextStep().click();

    // info om ulykkessted
    accidentPlaceForm.place().select(1);

    // Gå til neste steg
    general.nextStep().click();

    // info om ulykken
    testdata.paavirkningsform.forEach((form) => accidentForm.paavirkningsform().type(`${form}{enter}{esc}`));

    // Gå til neste steg
    general.nextStep().click();

    // info om skaden
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
      .virksomhetsnavn()
      .should('have.text', arbeidstaker.virksomhetsnavn); // se 1 organisasjon i fixtures/brukerinfo.json
    summary.accordians.tidOgSted().click();
    summary.tidOgSted
      .tid()
      .should(
        'have.text',
        `${testdata.fra.format('DD.MM.YYYY')} - ${testdata.til.format(
          'DD.MM.YYYY'
        )}`
      );

    summary.accordians.hendelsen().click();
    testdata.paavirkningsform.forEach((form) => {
      summary.hendelsen.paavirkningsformer().should('contain', form)
    })

    // gå tilbake og fjern en påvirkningsform
    general.backStep().click();
    general.backStep().click();
    general.backStep().click();
    accidentForm.fjernPaavirkingsformKnapp(testdata.paavirkningsform[1]).click()

    general.nextStep().click();
    general.nextStep().click();
    general.nextStep().click();

    summary.accordians.hendelsen().click();
    summary.hendelsen.paavirkningsformer().should('contain', testdata.paavirkningsform[0]);

    // send inn skjema
    summary.sendInjury().click().wait('@postSkademelding');

    cy.location().should((location) => {
      expect(location.pathname).to.contain('/skjema/kvittering');
    });
  });

  it('elev - tidstype tidspunkt - ingen avvik', () => {
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
    timeframeForm
      .timeframeWhenDate()
      .clear()
      .type(injuryTime.format('DD.MM.YYYY'))
      .type('{enter}');
    timeframeForm
      .timeframeWhenTime()
      .type(injuryTime.format('HH:mm'))
      .type('{enter}'); // ser ikke ut som den liker at dette felter skrives til
    timeframeForm.timeframePeriodOptions().select(elev.timeframe);

    // Gå til neste steg
    general.nextStep().click();

    // info om ulykkessted
    // sjekk validering
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 1);
    accidentPlaceForm.place().select(1);

    // Gå til neste steg
    general.nextStep().click();

      // info om ulykken
    // sjekk validering
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 1);
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
      .virksomhetsnavn()
      .should('have.text', elev.virksomhetsnavn); // se 1 organisasjon i fixtures/brukerinfo.json

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
    injuredForm
      .idNumber()
      .type(`{selectAll}${arbeidstaker.skadelidtIdentifikator}`);
    injuredForm.positionSelect().select(1);
    injuredForm.position().type(`${arbeidstaker.stilling}{enter}`);

    // Gå til neste steg
    general.nextStep().click();

    // velg tidspunkt
    timeframeForm
      .timeframeWhenDate()
      .clear()
      .type(injuryTime.format('DD.MM.YYYY'))
      .type('{enter}');
    timeframeForm
      .timeframeWhenTime()
      .type('{selectall}' + injuryTime.format('HH:mm'))
      .type('{enter}'); // ser ikke ut som den liker at dette felter skrives til
    // timeframeForm.timeframeWhenTime().click();
    // timeframeForm.timeframeWhenTimeSelect(13).click();
    timeframeForm.timeframePeriodOptions().select(arbeidstaker.timeframe);

    // Gå til neste steg
    general.nextStep().click();

    // info om ulykkessted
    accidentPlaceForm.place().select(1);
    accidentPlaceForm.placeType().select(2);

    // Gå til neste steg
    general.nextStep().click();

     // info om ulykken
     accidentForm.reasonOptions().type(`${arbeidstaker.aarsak}{enter}{esc}`);
     accidentForm
       .backgroundOptions()
       .type(`${arbeidstaker.bakgrunn}{enter}{esc}`);

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
  });

  it('arbeidstaker - yrkessykdom - flere perioder', () => {
    const testdata: TestSkademelding = {
      innmeldernavn: 'ROLF BJØRN',
      virksomhetsnavn: 'BIRI OG TORPO REGNSKAP',
      stilling: 'Administrerende direktører',
      skadelidtIdentifikator: '16120101181',
      tidstype: Tid.tidstype.PERIODE,
      fra: dayjs().add(-4, 'day'),
      til: dayjs(),
      sykdomPaavist: dayjs(),
      timeframe: 'I avtalt arbeidstid',
      kroppsdel: 'Øye, venstre',
      skadetype: 'Tap av legemsdel',
      paavirkningsform: ['Kjemikalier, løsemidler, gift, gass, væske o.l.', 'Vibrasjon']
    };

    const injuryTime = arbeidstaker.tidspunkt;
    // vent til innlogget sjekk er fullført
    cy.wait('@getInnlogget').wait('@getOrganisasjon').wait('@getRoller');

    // start innmelding
    info.startInnmelding().click();

    // info om skadelidte
    injuredForm
      .idNumber()
      .type(`{selectAll}${testdata.skadelidtIdentifikator}`);
    injuredForm.positionSelect().select(1);

    // valider stillingstittel
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 1);

    injuredForm.position().type(`${testdata.stilling}{enter}`);

    // Gå til neste steg
    general.nextStep().click();

    // sjekk validering
    timeframeForm.timeframeWhenOverPeriod().click();
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 2); // periode og tidsrom er påkrevd

    // fyll ut feltene
    timeframeForm.timeframePeriodOptions().select(testdata.timeframe);
    timeframeForm
      .timeframePeriodFromDate()
      .type(testdata.fra.format('DD.MM.YYYY'))
      .type('{enter}');
    timeframeForm
      .timeframePeriodToDate()
      .type(testdata.til.format('DD.MM.YYYY'))
      .type('{enter}');
    timeframeForm.timeframePeriodAdd().click();
    timeframeForm.timeframePeriodTable().should('have.length', 1);
    timeframeForm.timeframePeriodRemove().click();
    timeframeForm.timeframePeriodTable().should('have.length', 0);
    timeframeForm
      .timeframePeriodFromDate()
      .type(testdata.fra.format('DD.MM.YYYY'))
      .type('{enter}');
    timeframeForm
      .timeframePeriodToDate()
      .type(testdata.til.format('DD.MM.YYYY'))
      .type('{enter}');
    timeframeForm.timeframePeriodAdd().click();
    timeframeForm.timeframePeriodTable().should('have.length', 1);

    // sykdom paavist
    timeframeForm
      .timeframeSykdomPaavist()
      .type(testdata.sykdomPaavist.format('DD.MM.YYYY{enter}'));

    // Gå til neste steg
    general.nextStep().click();

    // Gå tilbake og sjekk at tilstand er lagret
    general.backStep().click();
    timeframeForm
      .timeframePeriodFromDate()
      .should('have.value', testdata.fra.format('DD.MM.YYYY'));
    timeframeForm
      .timeframePeriodToDate()
      .should('have.value', testdata.til.format('DD.MM.YYYY'));
    timeframeForm.timeframePeriodTable().should('have.length', 0);

    // legg til en ekstra periode
    timeframeForm.timeframePeriodAdd().click();
    timeframeForm.timeframePeriodTable().should('have.length', 1);
    timeframeForm
      .timeframePeriodFromDate()
      .type(testdata.fra.add(1, 'day').format('DD.MM.YYYY'))
      .type('{enter}');
    timeframeForm
      .timeframePeriodToDate()
      .type(testdata.til.format('DD.MM.YYYY'))
      .type('{enter}');

    // Gå til neste steg
    general.nextStep().click();
    // Gå tilbake og sjekk at tilstand er lagret
    general.backStep().click();
    timeframeForm
      .timeframePeriodFromDate()
      .should('have.value', testdata.fra.add(1, 'day').format('DD.MM.YYYY'));
    timeframeForm
      .timeframePeriodToDate()
      .should('have.value', testdata.til.format('DD.MM.YYYY'));
    timeframeForm.timeframePeriodTable().should('have.length', 1);

    // fortsett skjema
    // Gå til neste steg
    general.nextStep().click();

    // info om ulykkessted
    accidentPlaceForm.place().select(1);

    // Gå til neste steg
    general.nextStep().click();

    // info om ulykken
    testdata.paavirkningsform.forEach((form) => accidentForm.paavirkningsform().type(`${form}{enter}{esc}`));

    // Gå til neste steg
    general.nextStep().click();

    // info om skaden
    injuryForm.bodylocationOptions().select(testdata.kroppsdel);
    injuryForm.injuryTypeOptions().select(testdata.skadetype);
    injuryForm.addInjuryButton().click();

    // Gå til neste steg
    general.nextStep().click();

    // Gå til neste steg
    general.nextStep().click();

    // validerer oppsummering
    summary.accordians.innmelder().click();
    summary.innmelder.navn().should('have.text', testdata.innmeldernavn); // se i fixtures/brukerinfo.json
    summary.innmelder
      .virksomhetsnavn()
      .should('have.text', testdata.virksomhetsnavn); // se 1 organisasjon i fixtures/brukerinfo.json
    summary.accordians.tidOgSted().click();
    summary.tidOgSted
      .perioder()
      .should('have.length', 2);
    summary.tidOgSted.perioder().first().should(
      'have.text',
      `${testdata.fra.format('DD.MM.YYYY')} - ${testdata.til.format(
        'DD.MM.YYYY'
      )}`
    );
    summary.accordians.hendelsen().click();
    testdata.paavirkningsform.forEach((form) => {
      summary.hendelsen.paavirkningsformer().should('contain', form)
    })

    // send inn skjema
    summary.sendInjury().click().wait('@postSkademelding');

    cy.location().should((location) => {
      expect(location.pathname).to.contain('/skjema/kvittering');
    });
  });

  it('Førstegangstjeneste - tidstype tidspunkt - ingen avvik', () => {
    const injuryTime = førstegangstjeneste.tidspunkt;
    // vent til innlogget sjekk er fullført
    cy.wait('@getInnlogget').wait('@getOrganisasjon').wait('@getRoller');

    // start innmelding
    info.startInnmelding().click();

    // sjekk validering
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 2);

    // info om skadelidte
    injuredForm.idNumber().type(`{selectAll}${førstegangstjeneste.skadelidtIdentifikator}`);
    injuredForm.positionSelect().select(5);

    // legg til tjenesteperiode
    injuredForm
      .servicePeriodFromDate()
      .type(førstegangstjeneste.tjenestefra.format('DD.MM.YYYY'))
      .type('{enter}');
      injuredForm
      .servicePeriodToDate()
      .type(førstegangstjeneste.tjenestetil.format('DD.MM.YYYY'))
      .type('{enter}');

    // legg til tjenesteavdeling
    injuredForm.serviceDepartment().type(`{selectAll}${førstegangstjeneste.tjenesteavdeling}`);

    // Gå til neste steg
    general.nextStep().click();

    // velg tidspunkt
    // sjekk validering
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 2);
    timeframeForm
      .timeframeWhenDate()
      .clear()
      .type(injuryTime.format('DD.MM.YYYY'))
      .type('{enter}');
    timeframeForm
      .timeframeWhenTime()
      .type(injuryTime.format('HH:mm'))
      .type('{enter}'); // ser ikke ut som den liker at dette felter skrives til
    timeframeForm.timeframePeriodOptions().select(førstegangstjeneste.timeframe);

    // Gå til neste steg
    general.nextStep().click();

      // info om ulykken
    // sjekk validering
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 1);
    accidentForm.reasonOptions().type(`${førstegangstjeneste.aarsak}{enter}{esc}`);

    // Gå til neste steg
    general.nextStep().click();

    // info om skaden
    // sjekk validering
    general.nextStep().click();
    general.feilmeldinger().should('have.length', 1);
    injuryForm.bodylocationOptions().select(førstegangstjeneste.kroppsdel);
    injuryForm.injuryTypeOptions().select(førstegangstjeneste.skadetype);
    injuryForm.addInjuryButton().click();

    // Gå til neste steg
    general.nextStep().click();

    // Gå til neste steg
    general.nextStep().click();

    // validerer oppsummering
    summary.accordians.innmelder().click();
    summary.innmelder.navn().should('have.text', elev.innmeldernavn); // se i fixtures/brukerinfo.json
    summary.innmelder
      .virksomhetsnavn()
      .should('have.text', elev.virksomhetsnavn); // se 1 organisasjon i fixtures/brukerinfo.json

    // send inn skjema
    summary.sendInjury().click().wait('@postSkademelding');

    cy.location().should((location) => {
      expect(location.pathname).to.contain('/skjema/kvittering');
    });
  });
});
