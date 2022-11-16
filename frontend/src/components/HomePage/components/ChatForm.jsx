/* eslint-disable global-require */
import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useSocketIo } from '../../../hooks/useSocketIo';
import { useAuth } from '../../../contextComponents/AuthProvider';
import { selectActiveChannel } from '../../../slices/channelsSlice';

const ChatForm = () => {
  const { t } = useTranslation();
  const { addNewMessage } = useSocketIo();
  const { userData: { username } } = useAuth();
  const [chatFormState, setChatFormState] = useState('idle');
  const [chatFormValue, setChatFormValue] = useState('');
  const inputEl = useRef(null);
  const channelId = useSelector(selectActiveChannel);

  useEffect(() => {
    inputEl.current.focus();
  });

  const handleSuccessSubmit = () => {
    setChatFormValue('');
    setChatFormState('idle');
  };

  const handleFailedSubmit = () => {
    toast(t('toastify.networkErr'), {
      progressClassName: 'danger-progress-bar',
    });
    setChatFormState('idle');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setChatFormState('processing');
    addNewMessage(
      { body: filter.clean(chatFormValue), channelId, username },
      handleSuccessSubmit,
      handleFailedSubmit,
    );
  };

  return (
    <div className="mt-auto px-5 py-3">
      <form noValidate className="py-1 rounded-2" onSubmit={handleSubmit}>
        <div className="input-group has-validation">
          <input
            name="body"
            disabled={chatFormState === 'processing'}
            ref={inputEl}
            id="chat-input"
            aria-label="Новое сообщение"
            placeholder={t('chat.inputPlaceholder')}
            className="border-0 p-0 ps-2 form-control"
            value={chatFormValue}
            onChange={(e) => setChatFormValue(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-dark btn-submit-message"
            disabled={!chatFormValue.trim().length || chatFormState === 'processing'}
          >
            {chatFormState === 'processing'
              ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )
              : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
              )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;
