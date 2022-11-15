import React from 'react';
import Channels from './components/Channels';
import Messages from './components/Messages';
import ChatForm from './components/ChatForm';
import RenderModal from '../Modal/RenderModal';

const Chat = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 flex-md-row chat-back-plate">
      <div className="col-4 col-md-2 pt-5 px-0 channels">
        <Channels />
        <RenderModal />
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

export default Chat;
