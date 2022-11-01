import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

const AddChannel = ({ socket, channels }) => {
  const [modalShow, setModalShow] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [modalState, setModalState] = useState('idle');
  const [inputError, setInputError] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const isThereSameChannel = channels.some(({name}) => {
      return name === inputValue;
    });

    if (isThereSameChannel) {
      setInputError('Сhannel with this name already exists');
      setModalState('failed');
    } else if (inputValue.length < 3 || inputValue.length > 20) {
      setInputError('Сhannel name must be 3 to 20 characters');
      setModalState('failed');
    } else {
      socket.timeout(5000).emit('newChannel', { name: inputValue }, (err) => {
        if (err) {
          setInputError('Network error');
          setModalState('failed');
        } else {
          setModalShow(false);
          setInputValue('');
          setModalState('idle');
        }
      });
    }
  };
  
  return (
    <>
    <button type="button" onClick={() => {
      setModalShow(true)
      setInputValue('');
      setModalState('idle');
    }} className="p-0 text-light btn">
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
          Add channel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} >
            <Form.Control
              className="modal-input mb-2"
              placeholder="Channel name"
              autoFocus
              required
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              isInvalid={modalState === 'failed'}
            />
            <Form.Control.Feedback type="invalid" className="ps-1">{inputError}</Form.Control.Feedback>
            <div className="d-flex justify-content-end mt-3">
              <Button className="me-2" onClick={() => setModalShow(false)}
               variant="dark">Cancel</Button>
              <Button type="submit" variant="dark">Submit</Button>
            </div>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  );
};

export default AddChannel;