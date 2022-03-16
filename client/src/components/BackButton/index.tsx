import { Button } from '@navikt/ds-react';
import { Left } from '@navikt/ds-icons';
import './BackButton.less';

import { useNavigate } from 'react-router-dom';

interface IProps {
  url: string;
}

const BackButton = ({ url }: IProps) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(url);
  };
  return (
    <div className="backButton no-print">
      <Button onClick={handleBack} variant="tertiary" size="small" data-testid="tilbake-steg">
        <Left />
        Tilbake
      </Button>
    </div>
  );
};

export default BackButton;
