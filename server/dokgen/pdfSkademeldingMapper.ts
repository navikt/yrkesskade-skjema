import {
  PdfAdresse,
  PdfDokumentInfo,
  PdfHendelsesfakta,
  PdfInnmelder,
  PdfPeriode, PdfRolletype,
  PdfSkade,
  PdfSkadelidt,
  PdfSkademelding,
  PdfTekster,
  PdfTid,
  PdfTidspunkt,
  PdfUlykkessted,
} from './models';
import { Adresse, Hendelsesfakta, Innmelder, Skade, Skadelidt, Skademelding, SkadetDel, Tid, Ulykkessted } from '../../client/src/api/yrkesskade';
import { format, parseISO } from 'date-fns';
import { nb } from 'date-fns/locale';
import { KodeverkLoader } from '../kodeverk/kodeverk';

export const formatDate = (date: any, formatStr: string) =>
  format(date, formatStr, { locale: nb });

const DATO_FORMAT = 'dd.MM.yyyy';
const KLOKKESLETT_FORMAT = 'HH:mm';

export const pdfSkademeldingMapper = async (
  skademelding: Skademelding
): Promise<PdfSkademelding> => {

  // hent kodeverk
  const kodeverkLoader = new KodeverkLoader();
  await kodeverkLoader.init(skademelding.skadelidt.dekningsforhold.rolletype);

  return {
    innmelder: mapInnmelder(skademelding.innmelder),
    skadelidt: mapSkadelidt(skademelding.skadelidt, kodeverkLoader),
    skade: mapSkade(skademelding.skade, kodeverkLoader),
    hendelsesfakta: mapHendelsesfakta(skademelding.hendelsesfakta, kodeverkLoader),
    dokumentInfo: hentDokumentinfo(),
  };
};

const mapInnmelder = (innmelder: Innmelder): PdfInnmelder => {
  return {
    norskIdentitetsnummer: {
      label: 'Fødselsnummer',
      verdi: innmelder.norskIdentitetsnummer,
    },
    navn: { label: 'Navn', verdi: ''},
    altinnrolleIDer: {
      label: 'Roller hentet fra Altinn',
      verdi: innmelder.altinnrolleIDer || [''],
    },
    paaVegneAv: { label: 'Org.nr', verdi: innmelder.paaVegneAv },
    innmelderrolle: {
      label: 'Innmelderrolle',
      verdi: innmelder.innmelderrolle,
    },
  };
};

const mapSkadelidt = (skadelidt: Skadelidt, kodeverk: KodeverkLoader): PdfSkadelidt => {
  return {
    norskIdentitetsnummer: { label: 'Fødselsnummer', verdi: skadelidt.norskIdentitetsnummer},
    dekningsforhold: {
      organisasjonsnummer: { label: 'Org.nr', verdi: skadelidt.dekningsforhold.organisasjonsnummer},
      rolletype: { label: 'Rolle', verdi: mapRolletype(skadelidt.dekningsforhold.rolletype, kodeverk) },
      stillingstittelTilDenSkadelidte: { label: 'Stilling', verdi: kodeverk.mapKoderTilVerdier(skadelidt.dekningsforhold.stillingstittelTilDenSkadelidte, 'stillingstittel') },
      navnPaaVirksomheten: { label: 'Bedrift', verdi: skadelidt.dekningsforhold.navnPaaVirksomheten },
      virksomhetensAdresse: { label: 'Virksomhetens adresse', verdi: mapAdresse(skadelidt.dekningsforhold.virksomhetensAdresse, kodeverk) }
    }
   }
}

const mapRolletype = (rolletype: string, kodeverk: KodeverkLoader): PdfRolletype => {
  return {
    kode: rolletype,
    navn: kodeverk.mapKodeTilVerdi(rolletype, 'rolletype')
  }
}

const mapSkade = (skade: Skade, kodeverk: KodeverkLoader): PdfSkade => {
  return {
    antattSykefravaerTabellH: { label: 'Har den skadelidte hatt fravær', verdi: kodeverk.mapKodeTilVerdi(skade.antattSykefravaerTabellH, 'harSkadelidtHattFravaer') },
    skadedeDeler: skade.skadedeDeler.map((skadetDel: SkadetDel) => ({
      kroppsdelTabellD: { label: 'Hvor på kroppen er skaden', verdi: kodeverk.mapKodeTilVerdi(skadetDel.kroppsdelTabellD, 'skadetKroppsdel')},
      skadeartTabellC: { label: 'Hva slags skade er det', verdi: kodeverk.mapKodeTilVerdi(skadetDel.skadeartTabellC, 'skadetype') }
    })),
    alvorlighetsgrad: { label: 'Hvor alvorlig var hendelsen', verdi: skade.alvorlighetsgrad ? kodeverk.mapKodeTilVerdi(skade.alvorlighetsgrad, 'alvorlighetsgrad') : ''},
  }
}

const mapHendelsesfakta = (hendelsesfakta: Hendelsesfakta, kodeverk: KodeverkLoader): PdfHendelsesfakta => {
  return {
    tid: mapTid(hendelsesfakta.tid, kodeverk),
    naarSkjeddeUlykken: { label: 'Innenfor hvilket tidsrom inntraff ulykken', verdi: kodeverk.mapKodeTilVerdi(hendelsesfakta.naarSkjeddeUlykken, 'tidsrom') },
    hvorSkjeddeUlykken: { label: 'Hvor skjedde ulykken', verdi: kodeverk.mapKodeTilVerdi(hendelsesfakta.hvorSkjeddeUlykken, 'hvorSkjeddeUlykken') },
    ulykkessted: mapUlykkessted(hendelsesfakta.ulykkessted, kodeverk),
    aarsakUlykkeTabellAogE: { label: 'Hva var årsaken til hendelsen og bakgrunn for årsaken', verdi: kodeverk.mapKoderTilVerdier(hendelsesfakta.aarsakUlykkeTabellAogE, 'aarsakOgBakgrunn') },
    bakgrunnsaarsakTabellBogG: { label: 'Hva var bakgrunnen til hendelsen', verdi: kodeverk.mapKoderTilVerdier(hendelsesfakta.bakgrunnsaarsakTabellBogG, 'bakgrunnForHendelsen') },
    stedsbeskrivelseTabellF: { label: 'Hvilken type arbeidsplass er det', verdi: kodeverk.mapKodeTilVerdi(hendelsesfakta.stedsbeskrivelseTabellF, 'typeArbeidsplass') },
    utfyllendeBeskrivelse: { label: 'Utfyllende beskrivelse', verdi: hendelsesfakta.utfyllendeBeskrivelse || '' }
  }
}

const mapTid = (tid: Tid, kodeverk: KodeverkLoader): PdfTid => {
  const label = 'Når skjedde ulykken som skal meldes?'
  if (tid.tidstype === Tid.tidstype.TIDSPUNKT) {
    return {
      tidspunkt: {
        label,
        verdi: {
          dato: formatDate(parseISO(tid.tidspunkt), DATO_FORMAT),
          klokkeslett: formatDate(parseISO(tid.tidspunkt), KLOKKESLETT_FORMAT),
        } as PdfTidspunkt,
      },
      tidstype: tid.tidstype,
    };
  } else if (tid.tidstype === Tid.tidstype.PERIODE) {
    return {
      tidstype: tid.tidstype,
      periode: {
        label,
        verdi: {
          fra: formatDate(parseISO(tid.periode.fra), DATO_FORMAT),
          til: formatDate(parseISO(tid.periode.til), DATO_FORMAT),
        } as PdfPeriode,
      },
    };
  }

  return {
    tidstype: Tid.tidstype.UKJENT
  }
}

const mapUlykkessted = (ulykkessted: Ulykkessted, kodeverk: KodeverkLoader): PdfUlykkessted => {
  return {
    sammeSomVirksomhetensAdresse: { label: 'Skjedde ulykken på samme adresse', verdi: ulykkessted.sammeSomVirksomhetensAdresse ? 'Ja' : 'Nei'},
    adresse: { label: 'Adresse for ulykken', verdi: mapAdresse(ulykkessted.adresse, kodeverk) }
  }
}

const mapAdresse = (adresse: Adresse, kodeverk: KodeverkLoader): PdfAdresse => {
  return {
    adresselinje1: adresse.adresselinje1,
    adresselinje2: adresse.adresselinje2,
    adresselinje3: adresse.adresselinje3,
    land: kodeverk.mapKodeTilVerdi(adresse.land, 'landkoderISO2'),
  }
}

const hentDokumentinfo = (): PdfDokumentInfo => {
  return {
    dokumentnavn: 'Kopi av skademelding',
    dokumentDatoPrefix: 'Kopi generert',
    dokumentDato: formatDate(new Date(), DATO_FORMAT),
    dokumentnummer: 'Dette dokumenter er en oppsummering av det som er sendt til NAV',
    tekster: hentDokumenttekster(),
  };
};

const hentDokumenttekster = (): PdfTekster => {
  return {
    innmelderSeksjonstittel: 'Om innmelder',
    omSkadenFlereSkader: 'Flere skader',
    omSkadenSeksjonstittel: 'Om skaden',
    omUlykkenSeksjonstittel: 'Om ulykken',
    skadelidtSeksjonstittel: 'Den skadelidte',
    tidOgStedSeksjonstittel: 'Tid og sted',
  };
};
