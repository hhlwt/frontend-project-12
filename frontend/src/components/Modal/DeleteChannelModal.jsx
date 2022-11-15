import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSocketIo } from '../../hooks/useSocketIo';

const DeleteChannelModal = ({ modalProps: { id }, onHide, modalShow }) => {
  const { t } = useTranslation();
  const [processState, setProcessState] = useState('idle');
  const { deleteExistingChannel } = useSocketIo();

  const handleSuccessSubmit = () => {
    onHide();
    setProcessState('idle');
    toast(t('toastify.deleteChannelFulfilled'), {
      progressClassName: 'danger-progress-bar',
    });
  };

  const handleFailedSubmit = () => {
    setProcessState('idle');
    toast(t('toastify.networkErr'), {
      progressClassName: 'danger-progress-bar',
      className: 'glowing-alert',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessState('processing');
    deleteExistingChannel({ id }, handleSuccessSubmit, handleFailedSubmit);
  };

  return (
    <Modal
      show={modalShow}
      onHide={onHide}
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
        <p style={{ color: 'white' }} className="mb-0">{t('chat.deleteChannelModal.body')}</p>
        <div className="d-flex justify-content-end">
          <Button disabled={processState === 'processing'} className="me-2" onClick={onHide} variant="dark">{t('chat.modalButtons.cancel')}</Button>
          <Button disabled={processState === 'processing'} type="submit" onClick={handleSubmit} variant="danger">
            {processState === 'processing'
              ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )
              : t('chat.modalButtons.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannelModal;
