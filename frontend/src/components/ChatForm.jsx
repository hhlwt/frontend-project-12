import React, { useRef } from 'react';
import { useImmer } from 'use-immer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ChatForm = ({ socket }) => {
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
          form.state = 'failed';
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
            placeholder="Enter a new message..." 
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
            {'>'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;