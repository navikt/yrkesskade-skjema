import {
  PdfAdresse,
  PdfAnnet,
  PdfDokumentInfo,
  PdfHendelsesfakta,
  PdfInnmelder,
  PdfPeriode,
  PdfRolletype,
  PdfSkade,
  PdfSkadelidt,
  PdfSkademelding,
  PdfTekster,
  PdfTid,
  PdfTidspunkt,
  PdfUlykkessted,
  Soknadsfelt,
} from './models';
import {
  Adresse,
  Hendelsesfakta,
  Innmelder,
  Periode,
  Skade,
  Skadelidt,
  Skademelding,
  SkadetDel,
  Tid,
  Ulykkessted
} from '../../client/src/api/yrkesskade';
import {format, parseISO} from 'date-fns';
import {nb} from 'date-fns/locale';
import {KodeverkLoader} from '../kodeverk/kodeverk';
import tidstype = Tid.tidstype;

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
  const erSykdom = skademelding.hendelsesfakta.tid.tidstype === tidstype.PERIODE

  return {
    innmelder: mapInnmelder(skademelding.innmelder),
    skadelidt: mapSkadelidt(skademelding.skadelidt, kodeverkLoader),
    skade: mapSkade(skademelding.skade, kodeverkLoader),
    hendelsesfakta: mapHendelsesfakta(skademelding.hendelsesfakta, erSykdom, kodeverkLoader),
    dokumentInfo: hentDokumentinfo(skademelding, erSykdom),
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

const mapSkadetypeEllerSykdomstype = (skadeart: string, kodeverk: KodeverkLoader): string => {
  const skadetype = kodeverk.mapKodeTilVerdi(skadeart, 'skadetype')
  if (skadetype === `Ukjent: ${skadeart}`) {
    return kodeverk.mapKodeTilVerdi(skadeart, 'sykdomstype');
  }
  return skadetype;
}

const mapSkade = (skade: Skade, kodeverk: KodeverkLoader): PdfSkade => {
  return {
    antattSykefravaer: { label: 'Har den skadelidte hatt fravær', verdi: kodeverk.mapKodeTilVerdi(skade.antattSykefravaer, 'harSkadelidtHattFravaer') },
    skadedeDeler: skade.skadedeDeler.map((skadetDel: SkadetDel) => ({
      kroppsdel: { label: 'Hvor på kroppen er skaden', verdi: kodeverk.mapKodeTilVerdi(skadetDel.kroppsdel, 'skadetKroppsdel')},
      skadeart: { label: 'Hva slags skade eller sykdom er det', verdi: mapSkadetypeEllerSykdomstype(skadetDel.skadeart, kodeverk) }
    })),
    alvorlighetsgrad: { label: 'Hvor alvorlig var hendelsen', verdi: skade.alvorlighetsgrad ? kodeverk.mapKodeTilVerdi(skade.alvorlighetsgrad, 'alvorlighetsgrad') : ''},
  }
}


const mapHendelsesfakta = (hendelsesfakta: Hendelsesfakta, erSykdom: boolean, kodeverk: KodeverkLoader): PdfHendelsesfakta => {
  return {
    tid: mapTid(hendelsesfakta.tid, kodeverk),
    naarSkjeddeUlykken: { label: 'Innenfor hvilket tidsrom inntraff ulykken', verdi: kodeverk.mapKodeTilVerdi(hendelsesfakta.naarSkjeddeUlykken, 'tidsrom') },
    hvorSkjeddeUlykken: mapHvorSkjeddeUlykken(hendelsesfakta, erSykdom, kodeverk),
    ulykkessted: mapUlykkessted(hendelsesfakta.ulykkessted, erSykdom, kodeverk),
    paavirkningsform: { label: 'Hvilken skadelig påvirkning har personen vært utsatt for', verdi: kodeverk.mapKoderTilVerdier(hendelsesfakta.paavirkningsform, 'paavirkningsform') },
    aarsakUlykke: { label: 'Hva var årsaken til hendelsen og bakgrunn for årsaken', verdi: kodeverk.mapKoderTilVerdier(hendelsesfakta.aarsakUlykke, 'aarsakOgBakgrunn') },
    bakgrunnsaarsak: { label: 'Hva var bakgrunnen til hendelsen', verdi: kodeverk.mapKoderTilVerdier(hendelsesfakta.bakgrunnsaarsak, 'bakgrunnForHendelsen') },
    stedsbeskrivelse: { label: 'Hvilken type arbeidsplass er det', verdi: kodeverk.mapKodeTilVerdi(hendelsesfakta.stedsbeskrivelse, 'typeArbeidsplass') },
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
      perioder: {
        label,
        verdi: mapPerioder(tid.perioder)
      },
      sykdomPaavist: {
        label: 'Når ble sykdommen påvist?',
        verdi: tid.sykdomPaavist ? formatDate(parseISO(tid.sykdomPaavist), DATO_FORMAT) : null
      }
    };
  }

  return {
    tidstype: Tid.tidstype.UKJENT
  }
}

const mapHvorSkjeddeUlykken = (hendelsesfakta: Hendelsesfakta, erSykdom: boolean, kodeverk: KodeverkLoader): Soknadsfelt<string> => {
  if (erSykdom) {
    return {
      label: 'Hvor skjedde hendelsen',
      verdi: kodeverk.mapKodeTilVerdi(hendelsesfakta.hvorSkjeddeUlykken, 'hvorSkjeddeUlykken')
    };
  } else {
    return {
      label: 'Hvor skjedde ulykken',
      verdi: kodeverk.mapKodeTilVerdi(hendelsesfakta.hvorSkjeddeUlykken, 'hvorSkjeddeUlykken')
    };
  }
}

const mapPerioder = (perioder: Periode[]): PdfPeriode[] => {
  return perioder.map(periode => (
    {
      fra: formatDate(parseISO(periode.fra), DATO_FORMAT),
      til: formatDate(parseISO(periode.til), DATO_FORMAT),
    }
  ))
}

const mapUlykkessted = (ulykkessted: Ulykkessted, erSykdom: boolean, kodeverk: KodeverkLoader): PdfUlykkessted => {
  const feltSammeSomVirksomhetensAdresse = { label: 'Skjedde ulykken på samme adresse', verdi: ulykkessted.sammeSomVirksomhetensAdresse ? 'Ja' : 'Nei'}
  if (erSykdom) {
    return {
      sammeSomVirksomhetensAdresse: feltSammeSomVirksomhetensAdresse,
      adresse: { label: 'Adresse hvor den skadelige påvirkningen har skjedd', verdi: mapAdresse(ulykkessted.adresse, kodeverk) }
    }
  } else {
    return {
      sammeSomVirksomhetensAdresse: feltSammeSomVirksomhetensAdresse,
      adresse: { label: 'Adresse for ulykken', verdi: mapAdresse(ulykkessted.adresse, kodeverk) }
    }
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

const hentDokumentinfo = (skademelding: Skademelding, erSykdom: boolean): PdfDokumentInfo => {
  return {
    dokumentnavn: 'Kopi av skademelding',
    dokumentDatoPrefix: 'Kopi generert',
    dokumentDato: formatDate(new Date(), DATO_FORMAT),
    dokumentnummer: 'Dette dokumenter er en oppsummering av det som er sendt til NAV',
    tekster: hentDokumenttekster(erSykdom),
    annet: hentAnnet(skademelding)
  };
};

const hentDokumenttekster = (erSykdom: boolean): PdfTekster => {
  return {
    innmelderSeksjonstittel: 'Om innmelder',
    omSkadenFlereSkader: 'Flere skader',
    omSkadenSeksjonstittel: 'Om skaden',
    omUlykkenSeksjonstittel: erSykdom ? 'Om den skadelige påvirkningen' : 'Ulykkessted og om ulykken',
    skadelidtSeksjonstittel: 'Den skadelidte',
    tidOgStedSeksjonstittel: 'Tid og sted',
  };
};

const hentAnnet = (skademelding: Skademelding): PdfAnnet => {
  return {
    erSykdom: skademelding.hendelsesfakta.tid.tidstype === tidstype.PERIODE
  };
};
