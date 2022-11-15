import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddChannelModal from './AddChannelModal';
import DeleteChannelModal from './DeleteChannelModal';
import RenameChannelModal from './RenameChannelModal';
import { selectModalsState, hideModal, resetModal } from '../../slices/modalsSlice';

const modals = {
  adding: AddChannelModal,
  deleting: DeleteChannelModal,
  renaming: RenameChannelModal,
};

const RenderModal = () => {
  const dispatch = useDispatch();
  const { currentModal, modalProps, modalShow } = useSelector(selectModalsState);
  const Modal = modals[currentModal];

  const onHide = () => {
    dispatch(hideModal());
    setTimeout(() => {
      dispatch(resetModal());
    }, 100);
  };

  return currentModal
    ? <Modal onHide={onHide} modalShow={modalShow} modalProps={modalProps} />
    : null;
};

export default RenderModal;
