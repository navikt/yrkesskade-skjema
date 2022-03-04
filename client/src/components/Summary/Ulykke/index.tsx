import { isNil, path } from 'ramda';
import { Label, BodyShort } from '@navikt/ds-react';
import { useSelectedCompany } from '../../../context/SelectedCompanyContext';
import { Adresse } from '../../../api/yrkesskade';
interface IProps {
  data: any;
}
const UlykkeSummary = ({ data }: IProps) => {

  var adresse: Adresse = { adresselinje1: '', adresselinje2:'', adresselinje3: '', land: ''};
  const { selectedAddress } = useSelectedCompany();

  const ulykkessted = data.hendelsesfakta.ulykkessted;

  if (!ulykkessted.sammeSomVirksomhetensAdresse && ulykkessted.adresse) {
    adresse = ulykkessted.adresse;
  } else if (ulykkessted.sammeSomVirksomhetensAdresse && selectedAddress) {
    adresse = {
      adresselinje1: (selectedAddress.adresser && selectedAddress.adresser[0]) || '',
      adresselinje2: selectedAddress.postnummer || '',
      adresselinje3: selectedAddress.poststed || '',
      land: selectedAddress.land
    };
  }

  return (
    <div className="answerOuterContainer">
      <div className="answerContainer">
        <Label>Ulykken fant sted</Label>
        <BodyShort>
          {adresse.adresselinje1}
        </BodyShort>
        <BodyShort>
          {`${adresse.adresselinje2} ${adresse.adresselinje3}`}
        </BodyShort>
        <BodyShort>{adresse.land}</BodyShort>
      </div>
      {!isNil(data.skade.alvorlighetsgrad) && (
        <div className="answerContainer">
          <Label>Hvor Alvorlig var hendelsen</Label>
          <BodyShort>{data.skade.alvorlighetsgrad}</BodyShort>
        </div>
      )}
      {path(['hendelsesfakta', 'hvorSkjeddeUlykken'], data) !== 'undefined' && (
        <div className="answerContainer">
          <Label>Hvor skjedde ulykken</Label>
          <BodyShort>{data.hendelsesfakta.hvorSkjeddeUlykken}</BodyShort>
        </div>
      )}
      {path(['hendelsesfakta', 'stedsbeskrivelseTabellF'], data) !==
        'undefined' && (
        <div className="answerContainer">
          <Label>Type arbeidsplass</Label>
          <BodyShort>{data.hendelsesfakta.stedsbeskrivelseTabellF}</BodyShort>
        </div>
      )}
      {!isNil(data.skade.aarsakUlykkeTabellAogE) && (
        <div className="answerContainer">
          <Label>Årsak og bakgrunn for hendelsen</Label>
          <BodyShort>
            {data.hendelsesfakta.aarsakUlykkeTabellAogE.map(
              (background: string) => {
                return `${background}, `;
              }
            )}
          </BodyShort>
        </div>
      )}
      {!isNil(data.skade.bakgrunnsaarsakTabellBogG) && (
        <div className="answerContainer">
          <Label>Bakgrunn for hendelsen</Label>
          <BodyShort>
            {data.hendelsesfakta.bakgrunnsaarsakTabellBogG.map(
              (background: string) => {
                return `${background}, `;
              }
            )}
          </BodyShort>
        </div>
      )}
    </div>
  );
};

export default UlykkeSummary;
