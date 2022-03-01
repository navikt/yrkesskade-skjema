import { isNil, path } from 'ramda';
import { Label, BodyShort } from '@navikt/ds-react';
interface IProps {
  data: any;
}
const UlykkeSummary = ({ data }: IProps) => {
  return (
    <div className="answerOuterContainer">
      <div className="answerContainer">
        <Label>Ulykken fant sted</Label>
        <BodyShort>
          {data.hendelsesfakta.ulykkessted.adresse.adresselinje1}
        </BodyShort>
        <BodyShort>
          {`${data.hendelsesfakta.ulykkessted.adresse.adresselinje2} ${data.hendelsesfakta.ulykkessted.adresse.adresselinje3}`}
        </BodyShort>
        <BodyShort>{data.hendelsesfakta.ulykkessted.adresse.land}</BodyShort>
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
