import {isNil} from 'ramda';
interface IProps {
  innmelder: any;
}
const InnmelderSummary = ({ innmelder }: IProps) => {
  if(!isNil(innmelder)) {
    return (
    <>
      innmelding
    </>
  )} else {
    return(null)
  };
}

export default InnmelderSummary;
