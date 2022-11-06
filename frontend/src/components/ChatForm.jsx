import React, { useRef } from 'react';
import { useImmer } from 'use-immer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const ChatForm = ({ socket }) => {
  const {t} = useTranslation();
  const [chatForm, updateChatForm] = useImmer({
    state: 'idle',
    value: '',
  });
  const inputEl = useRef(null);
  const channelId = useSelector((state) => state.channels.activeChannel);
  const { username } = JSON.parse(localStorage.getItem('userId'));

  useEffect(() => {
    inputEl.current.focus();
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    updateChatForm((form) => {
      form.state = 'processing'
    });
    socket.timeout(5000).emit('newMessage', { body: chatForm.value, channelId, username }, (err) => {
      if (err) {
        updateChatForm((form) => {
          toast(t('toastify.networkErr'), {
            progressClassName: "danger-progress-bar",
          });
          form.state = 'idle';
        })
      } else {
        updateChatForm((form) => {
          form.state = 'idle';
          form.value = '';
        });
      }
    });
  };

  return (
    <div className="mt-auto px-5 py-3">
      <form noValidate className="py-1 rounded-2" onSubmit={handleSubmit}>
        <div className="input-group has-validation">
          <input name="body"
            disabled={chatForm.state === 'processing'}
            ref={inputEl}
            id="chat-input"
            aria-label="New message" 
            placeholder={t('chat.inputPlaceholder')}
            className="border-0 p-0 ps-2 form-control"
            value={chatForm.value}
            onChange={(e) => updateChatForm((form) => {
              form.value = e.target.value;
            })}
          >
          </input>
          <button type="submit"
            className="btn btn-dark btn-submit-message"
            disabled={!chatForm.value.length || chatForm.state === 'processing'}
          >
            {chatForm.state === 'processing' ?
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div> :
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
              </svg>
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;