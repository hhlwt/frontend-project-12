import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSocketIo } from '../../../hooks/useSocketIo';

const DeleteChannel = ({ id }) => {
  const { t } = useTranslation();
  const [modalShow, setModalShow] = useState(false);
  const [processState, setProcessState] = useState('idle');
  const { emitDeleteChannel } = useSocketIo();

  const handleSuccessEmit = () => {
    setModalShow(false);
    setProcessState('idle');
    toast(t('toastify.deleteChannelFulfilled'), {
      progressClassName: 'danger-progress-bar',
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
    emitDeleteChannel({ id }, handleSuccessEmit, handleFailedEmit);
  };

  return (
    <>
      <button
        type="button"
        className="dropdown-button"
        onClick={() => {
          const dropdownMenu = document.querySelector('.dropdown-menu.show');
          dropdownMenu.classList.remove('show');
          setModalShow(true);
          setProcessState('idle');
        }}
      >
        {t('chat.deleteChannelModal.triggerButton')}

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
            {t('chat.deleteChannelModal.header')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ color: 'white' }} className="mb-0">{t('chat.deleteChannelModal.body')}</p>
          <div className="d-flex justify-content-end">
            <Button disabled={processState === 'processing'} className="me-2" onClick={() => setModalShow(false)} variant="dark">{t('chat.modalButtons.cancel')}</Button>
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
    </>
  );
};

export default DeleteChannel;
