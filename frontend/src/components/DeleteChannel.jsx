import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteChannel = ({id, socket}) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalState, setModalState] = useState('idle');
  const [processError, setProcessError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalState('processing');
    socket.timeout(5000).emit('removeChannel', { id }, (err) => {
      if (err) {
        setProcessError('Network error');
        setModalState('failed');
      } else {
        setModalShow(false);
        setModalState('idle');
      }
    });
  }

  return (
    <>
    <button className="dropdown-button" onClick={() => {
      const dropdownMenu = document.querySelector('.dropdown-menu.show');
      dropdownMenu.classList.remove('show');
      setModalShow(true);
      setModalState('idle');
    }}>Delete</button>
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="m"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="text-light">
          Delete channel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{'color':'white'}} className="mb-0">Are you sure?</p>
        {modalState === 'failed' ? <p className="text-danger">{processError}</p> : null}
        <div className="d-flex justify-content-end">
          <Button disabled={modalState === 'processing'} className="me-2" onClick={() => setModalShow(false)} variant="dark">Cancel</Button>
          <Button disabled={modalState === 'processing'} type="submit" onClick={handleSubmit} variant="dark">
            {modalState === 'processing' ?
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div> :
            'Submit'}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
    </>
  );
};

export default DeleteChannel;