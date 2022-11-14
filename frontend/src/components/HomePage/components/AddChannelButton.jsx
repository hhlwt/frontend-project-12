import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentModal } from '../../../slices/modalsSlice';

const AddChannelButton = ({ channels }) => {
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      onClick={() => {
        dispatch(setCurrentModal({ currentModal: 'adding', modalProps: { channels } }));
      }}
      className="p-0 text-light btn"
    >
      +
    </button>
  );
};

export default AddChannelButton;
