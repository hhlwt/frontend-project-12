import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const RenameChannel = ({id, socket, channels, name}) => {
  const {t} = useTranslation();
  const [modalShow, setModalShow] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [processState, setProcessState] = useState('idle');
  const [processError, setProcessError] = useState('');
  const inputEl = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessState('processing');
    const isThereSameChannel = channels.some(({name}) => {
      return name === inputValue;
    });

    if (isThereSameChannel) {
      setProcessError('nameExistsErr');
      setProcessState('failed');
    } else if (inputValue.length < 3 || inputValue.length > 20) {
      setProcessError('nameLengthErr');
      setProcessState('failed');
    } else {
      socket.timeout(5000).emit('renameChannel', { id, name: inputValue }, (err) => {
        if (err) {
          setProcessError('networkErr');
          setProcessState('failed');
        } else {
          setModalShow(false);
          setProcessState('idle');
        }
      });
    }
  };

  useEffect(() => {
    if (modalShow === true) {
      inputEl.current.select();
    }
  }, [modalShow])

  return (
    <>
    <button className="dropdown-button" onClick={() => {
      const dropdownMenu = document.querySelector('.dropdown-menu.show');
      dropdownMenu.classList.remove('show');
      setModalShow(true);
      setInputValue(name);
      setProcessState('idle');
    }}>{t('chat.renameChannelModal.triggerButton')}</button>
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="m"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="text-light">
          {t('chat.renameChannelModal.header')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} >
          <Form.Control
              disabled={processState === 'processing'}
              className="modal-input mb-2"
              placeholder={t('chat.renameChannelModal.inputPlaceholder')}
              autoFocus
              required
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              isInvalid={processState === 'failed'}
              ref={inputEl}
            />
            <Form.Control.Feedback type="invalid" className="ps-1">{t(`chat.modalErrors.${processError}`)}</Form.Control.Feedback>
            <div className="d-flex justify-content-end mt-3">
              <Button disabled={processState === 'processing'} className="me-2" onClick={() => setModalShow(false)} variant="dark">{t('chat.modalButtons.cancel')}</Button>
              <Button disabled={processState === 'processing'} type="submit" onClick={handleSubmit} variant="dark">
                {processState === 'processing' ?
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div> :
                t('chat.modalButtons.submit')}
              </Button>
            </div>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  );
};

export default RenameChannel;