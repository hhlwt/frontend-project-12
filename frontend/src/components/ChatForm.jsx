import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const socket = io.connect();

const ChatForm = () => {
  const [body, setBody] = useState('');
  const inputEl = useRef(null);
  const channelId = useSelector((state) => state.channels.activeChannel);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('newMessage', { body, channelId, username: 'admin' });
    setBody('');
    inputEl.current.focus();
  };

  return (
    <div className="mt-auto px-5 py-3">
      <form noValidate className="py-1 rounded-2" onSubmit={handleSubmit}>
        <div className="input-group has-validation">
          <input name="body"
            ref={inputEl}
            id="chat-input"
            aria-label="New message" 
            placeholder="Enter a new message..." 
            className="border-0 p-0 ps-2 form-control"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          >
          </input>
          <button type="submit"
            className="btn btn-dark chat-btn">
            {'>'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;