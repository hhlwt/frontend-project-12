import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateChannel } from '../slices/channelsSlice';

const RenameChannel = ({id, socket, channels, name}) => {
  const [modalShow, setModalShow] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [modalState, setModalState] = useState('idle');
  const [inputError, setInputError] = useState('');
  const dispatch = useDispatch();
  const inputEl = useRef();

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
      socket.timeout(5000).emit('renameChannel', { id, name: inputValue }, (err) => {
        if (err) {
          setInputError('Network error');
          setModalState('failed');
        } else {
          dispatch(updateChannel({id, changes: { name: inputValue }}));
          setModalShow(false);
          setModalState('idle');
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
      setModalState('idle');
    }}>Rename</button>
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="m"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="text-light">
          Rename channel
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
              ref={inputEl}
            />
            <Form.Control.Feedback type="invalid" className="ps-1">{inputError}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button className="me-2" onClick={() => setModalShow(false)} variant="dark">Cancel</Button>
              <Button type="submit" onClick={handleSubmit} variant="dark">Submit</Button>
            </div>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  );
};

export default RenameChannel;