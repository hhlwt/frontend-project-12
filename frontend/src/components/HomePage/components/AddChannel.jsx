import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSocketIo } from '../../../hooks/useSocketIo';

const AddChannel = ({ channels }) => {
  const { t } = useTranslation();
  const [modalShow, setModalShow] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [processState, setProcessState] = useState('idle');
  const [processError, setProcessError] = useState('');
  const { emitAddChannel } = useSocketIo();

  const handleSuccessEmit = () => {
    setModalShow(false);
    setInputValue('');
    setProcessState('idle');
    toast(t('toastify.addChannelFulfilled'), {
      progressClassName: 'success-progress-bar',
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
    const isThereSameChannel = channels.some(({ name }) => name === inputValue);

    if (isThereSameChannel) {
      setProcessError('nameExistsErr');
      setProcessState('failed');
    } else if (inputValue.length < 3 || inputValue.length > 20) {
      setProcessError('nameLengthErr');
      setProcessState('failed');
    } else {
      emitAddChannel({ name: inputValue }, handleSuccessEmit, handleFailedEmit);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setModalShow(true);
          setInputValue('');
          setProcessState('idle');
        }}
        className="p-0 text-light btn"
      >
        +
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
            {t('chat.addChannelModal.header')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              disabled={processState === 'processing'}
              className="modal-input mb-2"
              placeholder={t('chat.addChannelModal.inputPlaceholder')}
              autoFocus
              id="name"
              required
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              isInvalid={processState === 'failed'}
            />
            <Form.Label className="visually-hidden" htmlFor="name">Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid" className="ps-1">{t(`chat.modalErrors.${processError}`)}</Form.Control.Feedback>
            <div className="d-flex justify-content-end mt-3">
              <Button
                disabled={processState === 'processing'}
                className="me-2"
                onClick={() => setModalShow(false)}
                variant="dark"
              >
                {t('chat.modalButtons.cancel')}
              </Button>
              <Button disabled={processState === 'processing'} type="submit" variant="dark">
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

export default AddChannel;
