import { Label, BodyShort } from '@navikt/ds-react';
import { useSelectedCompany } from '../../../context/SelectedCompanyContext';
import { Adresse } from '../../../api/yrkesskade';
import { isEmpty, get } from 'lodash';
import { useAppSelector } from '../../../core/hooks/state.hooks';
import { selectKodeverk } from '../../../core/reducers/kodeverk.reducer';
import roller from '../../../utils/roller';
interface IProps {
  data: any;
}
const UlykkeSummary = ({ data }: IProps) => {
  let adresse: Adresse = {
    adresselinje1: '',
    adresselinje2: '',
    adresselinje3: '',
    land: '',
  };
  const { selectedAddress } = useSelectedCompany();
  const hvorSkjeddeUlykkenkoder = useAppSelector((state) =>
    selectKodeverk(state, 'hvorSkjeddeUlykken')
  );
  const typeArbeidsplasskoder = useAppSelector((state) =>
    selectKodeverk(state, 'typeArbeidsplass')
  );
  const aarsakOgBakgrunnkoder = useAppSelector((state) =>
    selectKodeverk(state, 'aarsakOgBakgrunn')
  );
  const bakgrunnForHendelsenkoder = useAppSelector((state) =>
    selectKodeverk(state, 'bakgrunnForHendelsen')
  );
  const paavirkningsformKoder = useAppSelector((state) =>
    selectKodeverk(state, 'paavirkningsform')
  );
  const alvorlighetsgradkoder = useAppSelector((state) =>
    selectKodeverk(state, 'alvorlighetsgrad')
  );
  const landkoder = useAppSelector((state) =>
    selectKodeverk(state, 'landkoderISO2')
  );

  const ulykkessted = data.hendelsesfakta.ulykkessted;
  const sammeSomVirksomhetensAdresse =
    ulykkessted.sammeSomVirksomhetens ||
    ulykkessted.sammeSomVirksomhetens === 'true';

  if (!sammeSomVirksomhetensAdresse && ulykkessted.adresse) {
    adresse = ulykkessted.adresse;
  } else if (sammeSomVirksomhetensAdresse && selectedAddress) {
    adresse = {
      adresselinje1:
        (selectedAddress.adresser && selectedAddress.adresser[0]) || '',
      adresselinje2: selectedAddress.postnummer || '',
      adresselinje3: selectedAddress.poststed || '',
      land: selectedAddress.landkode,
    };
  }

  const rolletype = data?.skadelidt?.dekningsforhold.rolletype;
  const isPeriod = data?.hendelsesfakta?.tid.tidstype === 'Periode';

  return (
    <div className="answerOuterContainer">
      {roller[rolletype] && roller[rolletype].showAccidentPlacePage && (
        <div className="answerContainer">
          <Label>Ulykken fant sted</Label>
          <BodyShort>{adresse.adresselinje1}</BodyShort>
          <BodyShort>
            {`${adresse.adresselinje2} ${adresse.adresselinje3}`}
          </BodyShort>
          <BodyShort>
            {landkoder && landkoder[adresse.land || 'NO']?.verdi}
          </BodyShort>
        </div>
      )}
      {!isEmpty(data.skade.alvorlighetsgrad) && (
        <div className="answerContainer">
          <Label>Hvor Alvorlig var hendelsen</Label>
          <BodyShort>
            {alvorlighetsgradkoder &&
              alvorlighetsgradkoder[data.skade.alvorlighetsgrad]?.verdi}
          </BodyShort>
        </div>
      )}
      {get(data, ['hendelsesfakta', 'hvorSkjeddeUlykken']) !== 'undefined' && roller[rolletype] && roller[rolletype].showAccidentPlacePage && roller[rolletype].showAccidentPlace && (
        <div className="answerContainer">
          <Label>Hvor skjedde ulykken</Label>
          <BodyShort>
            {hvorSkjeddeUlykkenkoder &&
              hvorSkjeddeUlykkenkoder[data.hendelsesfakta.hvorSkjeddeUlykken]
                ?.verdi}
          </BodyShort>
        </div>
      )}
      {get(data, ['hendelsesfakta', 'stedsbeskrivelse']) !== 'undefined' &&
        roller[rolletype] &&
        !roller[rolletype].isElevEllerStudent && roller[rolletype].showWorkplace &&
        !isPeriod && (
          <div className="answerContainer">
            <Label>Type arbeidsplass</Label>
            <BodyShort>
              {typeArbeidsplasskoder &&
                typeArbeidsplasskoder[data.hendelsesfakta.stedsbeskrivelse]
                  ?.verdi}
            </BodyShort>
          </div>
        )}
      {!isEmpty(data.hendelsesfakta.aarsakUlykke) && (
        <div className="answerContainer">
          <Label>Årsak og bakgrunn for hendelsen</Label>
          <BodyShort>
            {data.hendelsesfakta.aarsakUlykke
              .map((background: string) => {
                return `${
                  aarsakOgBakgrunnkoder &&
                  aarsakOgBakgrunnkoder[background]?.verdi
                }`;
              })
              .join(', ')}
          </BodyShort>
        </div>
      )}
      {!isEmpty(data.hendelsesfakta.bakgrunnsaarsak) && !isPeriod && (
        <div className="answerContainer">
          <Label>Bakgrunn for hendelsen</Label>
          <BodyShort>
            {data.hendelsesfakta.bakgrunnsaarsak
              .map((background: string) => {
                return `${
                  bakgrunnForHendelsenkoder &&
                  bakgrunnForHendelsenkoder[background]?.verdi
                }`;
              })
              .join(', ')}
          </BodyShort>
        </div>
      )}
      {!isEmpty(data.hendelsesfakta.paavirkningsform) && (
        <div className="answerContainer">
          <Label>
            Hvilken skadelig påvirkning har personen vært utsatt for?
          </Label>
          <BodyShort data-testid="oppsummering-paavirkningsformer">
            {data.hendelsesfakta.paavirkningsform
              .map((paavirkning: string) => {
                return `${
                  paavirkningsformKoder &&
                  paavirkningsformKoder[paavirkning]?.verdi
                }`;
              })
              .join(', ')}
          </BodyShort>
        </div>
      )}
    </div>
  );
};

export default UlykkeSummary;
