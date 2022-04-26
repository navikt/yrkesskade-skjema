import { useState, useEffect } from 'react';
import { Button, Modal, Heading, BodyLong } from '@navikt/ds-react';

// import { useStateMachine } from 'little-state-machine';
// import clearFormAction from '../../State/actions/clearAction';
import { useCancel } from '../../core/hooks/cancel.hooks';

// import './BackButton.less';

// import { useNavigate } from 'react-router-dom';

const ExitButton = () => {
  // const navigate = useNavigate();
  // const { actions } = useStateMachine({
  //   clearFormAction,
  // });
  const cancel = useCancel();

  const [isOpen, setIsOpen] = useState(false);
  const handleButtonClick = () => {
    setIsOpen(true);
  };
  const onCloseModal = () => {
    setIsOpen(false);
  };



  // const handleCancel = () => {
  //   actions.clearFormAction({});
  //   navigate('https://nav.no');
  // };

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     Modal.setAppElement('#root');
  //   }
  // });

  return (
    <>
      <Button
        onClick={handleButtonClick}
        variant="secondary"
        size="small"
        data-testid="avbryt-innmelding"
      >
        Avbryt
      </Button>
      <Modal open={isOpen} onClose={onCloseModal} aria-label="{false}">
        <Modal.Content>
          <Heading className="spacer" level="1" size="large">
            Header
          </Heading>
          <Heading className="spacer" level="2" size="medium">
            Subheading
          </Heading>
          <BodyLong className="spacer">
            Cupidatat irure ipsum veniam ad in esse.
          </BodyLong>
          <BodyLong className="spacer">
            Cillum tempor pariatur amet ut laborum Lorem enim enim.
          </BodyLong>
          <div>
            <Button onClick={onCloseModal}>Til skjema</Button>
            <Button onClick={cancel}>Adios</Button>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ExitButton;
