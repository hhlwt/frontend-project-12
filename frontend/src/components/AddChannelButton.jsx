import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { setActiveChannel, addChannel } from '../slices/channelsSlice';

const AddChannelButton = ({ socket, channels }) => {
  const [modalShow, setModalShow] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isFailedVal, setIsFailedVal] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault();
    const isThereSameChannel = channels.some(({name}) => {
      return name === inputValue;
    });

    if (isThereSameChannel) {
      console.log('exists')
      setIsFailedVal(true)
    } else {
      socket.emit('newChannel', { name: inputValue })
      setInputValue('');
      setModalShow(false);
    }
  };

  return (
    <>
    <button type="button" onClick={() => {
      setModalShow(true)
      setInputValue('');
      setIsFailedVal(false)
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
              isInvalid={isFailedVal}
            />
            <Form.Control.Feedback type="invalid" className="ps-1">Error</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="dark">Submit</Button>
            </div>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  );
};

export default AddChannelButton;