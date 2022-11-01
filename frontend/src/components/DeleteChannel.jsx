import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { deleteChannel, setActiveChannel } from '../slices/channelsSlice';
import { useDispatch } from 'react-redux';

const DeleteChannel = ({id, socket}) => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.timeout(5000).emit('removeChannel', { id }, (err) => {
      if (err) {
        console.log('ERR!!!')
      } else {
        setModalShow(false)
        dispatch(deleteChannel(id));
        dispatch(setActiveChannel(1));
      }
    });
  }

  return (
    <>
    <button className="dropdown-button" onClick={() => {
      const dropdownMenu = document.querySelector('.dropdown-menu.show');
      dropdownMenu.classList.remove('show');
      setModalShow(true)
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
          <div className="d-flex justify-content-end">
            <Button className="me-2" onClick={() => setModalShow(false)} variant="dark">Cancel</Button>
            <Button type="submit" onClick={handleSubmit} variant="dark">Submit</Button>
          </div>
      </Modal.Body>
    </Modal>
    </>
  );
};

export default DeleteChannel;