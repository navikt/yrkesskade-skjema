import { Button } from '@navikt/ds-react';
import { Left } from '@navikt/ds-icons';
import './BackButton.less';

import { useNavigate } from 'react-router-dom';

interface IProps {
  decreaseStep: () => void;
  url: string;
}

const BackButton = ({ decreaseStep, url }: IProps) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(url);
    decreaseStep();
  };
  return (
    <div className="backButton">
      <Button onClick={handleBack} variant="tertiary" size="small">
        <Left />
        Tilbake
      </Button>
    </div>
  );
};

export default BackButton;
