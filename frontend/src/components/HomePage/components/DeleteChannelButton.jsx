import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setCurrentModal } from '../../../slices/modalsSlice';

const DeleteChannelButton = ({ id }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className="dropdown-button"
      onClick={() => {
        const dropdownMenu = document.querySelector('.dropdown-menu.show');
        dropdownMenu.classList.remove('show');
        dispatch(setCurrentModal({ currentModal: 'deleting', modalProps: { id } }));
      }}
    >
      {t('chat.deleteChannelModal.triggerButton')}
    </button>
  );
};

export default DeleteChannelButton;
