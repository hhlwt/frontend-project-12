import React from 'react';
import Channels from '../Channels';
import Messages from '../Messages';
import ChatForm from '../ChatForm';

const Chat = () => {
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 flex-md-row chat-back-plate">
        <div className="col-4 col-md-2 pt-5 px-0 channels">
          <div className="d-flex justify-content-between mb-3 ps-2 pe-2">
            <span>Channels</span>
            <button type="button" className="p-0 text-light btn btn-add-channel">+</button>
          </div>
          <Channels />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <Messages />
            <ChatForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;