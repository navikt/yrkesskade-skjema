import {isNil} from 'ramda';
interface IProps {
  hendelsesfakta: any;
}
const HendelsesfaktaSummary = ({ hendelsesfakta }: IProps) => {
  console.log(hendelsesfakta);
  if(!isNil(hendelsesfakta)) {
    return (
    <>
      hendelsesfakta
    </>
  )} else {
    return(null)
  };
}

export default HendelsesfaktaSummary;
