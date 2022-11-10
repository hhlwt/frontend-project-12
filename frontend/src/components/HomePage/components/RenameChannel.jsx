import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSocketIo } from '../../../hooks/useSocketIo';

const RenameChannel = ({
  id, channels, name,
}) => {
  const { t } = useTranslation();
  const [modalShow, setModalShow] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [processState, setProcessState] = useState('idle');
  const [processError, setProcessError] = useState('');
  const { emitRenameChannel } = useSocketIo();
  const inputEl = useRef();

  const handleSuccessEmit = () => {
    setModalShow(false);
    setProcessState('idle');
    toast(t('toastify.renameChannelFulfilled'), {
      progressClassName: 'info-progress-bar',
    });
  };

  const handleFailedEmit = () => {
    toast(t('toastify.networkErr'), {
      progressClassName: 'danger-progress-bar',
      className: 'glowing-alert',
    });
    setProcessState('idle');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessState('processing');
    const isThereSameChannel = channels.some((channel) => channel.name === inputValue);

    if (isThereSameChannel) {
      setProcessError('nameExistsErr');
      setProcessState('failed');
    } else if (inputValue.length < 3 || inputValue.length > 20) {
      setProcessError('nameLengthErr');
      setProcessState('failed');
    } else {
      emitRenameChannel({ id, name: inputValue }, handleSuccessEmit, handleFailedEmit);
    }
  };

  useEffect(() => {
    if (modalShow === true) {
      inputEl.current.select();
    }
  }, [modalShow]);

  return (
    <>
      <button
        type="button"
        className="dropdown-button"
        onClick={() => {
          const dropdownMenu = document.querySelector('.dropdown-menu.show');
          dropdownMenu.classList.remove('show');
          setModalShow(true);
          setInputValue(name);
          setProcessState('idle');
        }}
      >
        {t('chat.renameChannelModal.triggerButton')}

      </button>
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
          <Form onSubmit={handleSubmit}>
            <Form.Control
              disabled={processState === 'processing'}
              className="modal-input mb-2"
              placeholder={t('chat.renameChannelModal.inputPlaceholder')}
              autoFocus
              required
              id="name"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              isInvalid={processState === 'failed'}
              ref={inputEl}
            />
            <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid" className="ps-1">{t(`chat.modalErrors.${processError}`)}</Form.Control.Feedback>
            <div className="d-flex justify-content-end mt-3">
              <Button disabled={processState === 'processing'} className="me-2" onClick={() => setModalShow(false)} variant="dark">{t('chat.modalButtons.cancel')}</Button>
              <Button disabled={processState === 'processing'} type="submit" onClick={handleSubmit} variant="dark">
                {processState === 'processing'
                  ? (
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )
                  : t('chat.modalButtons.submit')}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RenameChannel;
