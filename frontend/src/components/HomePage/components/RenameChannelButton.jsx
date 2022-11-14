import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setCurrentModal } from '../../../slices/modalsSlice';

const RenameChannelButton = ({
  id, channels, name,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className="dropdown-button"
      onClick={() => {
        const dropdownMenu = document.querySelector('.dropdown-menu.show');
        dropdownMenu.classList.remove('show');
        dispatch(setCurrentModal({ currentModal: 'renaming', modalProps: { id, channels, name } }));
      }}
    >
      {t('chat.renameChannelModal.triggerButton')}
    </button>

  );
};

export default RenameChannelButton;
