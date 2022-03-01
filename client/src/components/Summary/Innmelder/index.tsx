import { path } from 'ramda';
import { Label, BodyShort } from '@navikt/ds-react';
interface IProps {
  data: any;
}
const InnmelderSummary = ({ data }: IProps) => {
  // 'innmelder': {
  //   'norskIdentitetsnummer': 20089408750,
  //   'paaVegneAv': 'paaVegneAv',
  //   'innmelderrolle': 'innmelderrolle',
  //   'altinnrolleIDer': ['altinnrolleIDer', 'altinnrolleIDer'],
  // },
  return (
    <div className="answerOuterContainer">
      {path(['innmelder', 'norskIdentitetsnummer'], data) !==
        'undefined' && (
        <div className="answerContainer">
          <Label>Innmelders fødselsnummer</Label>
          <BodyShort>{data.innmelder.norskIdentitetsnummer}</BodyShort>
        </div>
      )}
      {path(['innmelder', 'paaVegneAv'], data) !==
        'undefined' && (
        <div className="answerContainer">
          <Label>På vegne av</Label>
          <BodyShort>{data.innmelder.paaVegneAv}</BodyShort>
        </div>
      )}
      {path(['innmelder', 'innmelderrolle'], data) !==
        'undefined' && (
        <div className="answerContainer">
          <Label>Innmelders rolle</Label>
          <BodyShort>{data.innmelder.innmelderrolle}</BodyShort>
        </div>
      )}
      {path(['innmelder', 'altinnrolleIDer'], data) !==
        'undefined' && (
        <div className="answerContainer">
          <Label>Altinn rolleIDer</Label>
          <BodyShort>
            {data.innmelder.altinnrolleIDer.map((id: string) => id)}
          </BodyShort>
        </div>
      )}
    </div>
  );
};

export default InnmelderSummary;
