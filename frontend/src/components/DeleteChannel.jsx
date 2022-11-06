import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DeleteChannel = ({id, socket}) => {
  const {t} = useTranslation();
  const [modalShow, setModalShow] = useState(false);
  const [processState, setProcessState] = useState('idle');
  const [processError, setProcessError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessState('processing');
    socket.timeout(5000).emit('removeChannel', { id }, (err) => {
      if (err) {
        setProcessError('networkErr');
        setProcessState('failed');
      } else {
        setModalShow(false);
        setProcessState('idle');
      }
    });
  }

  return (
    <>
    <button className="dropdown-button" onClick={() => {
      const dropdownMenu = document.querySelector('.dropdown-menu.show');
      dropdownMenu.classList.remove('show');
      setModalShow(true);
      setProcessState('idle');
    }}>{t('chat.deleteChannelModal.triggerButton')}</button>
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="m"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="text-light">
          {t('chat.deleteChannelModal.header')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{'color':'white'}} className="mb-0">{t('chat.deleteChannelModal.body')}</p>
        {processState === 'failed' ? <p className="text-danger">{t(`chat.modalErrors.${processError}`)}</p> : null}
        <div className="d-flex justify-content-end">
          <Button disabled={processState === 'processing'} className="me-2" onClick={() => setModalShow(false)} variant="dark">{t('chat.modalButtons.cancel')}</Button>
          <Button disabled={processState === 'processing'} type="submit" onClick={handleSubmit} variant="dark">
            {processState === 'processing' ?
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div> :
            t('chat.modalButtons.submit')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
    </>
  );
};

export default DeleteChannel;