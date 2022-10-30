import React from 'react';
import Channels from '../Channels';
import Messages from '../Messages';
import ChatForm from '../ChatForm';
import io from 'socket.io-client';

const socket = io.connect();

const Chat = () => {
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 flex-md-row chat-back-plate">
        <div className="col-4 col-md-2 pt-5 px-0 channels">
          <Channels socket={socket}/>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <Messages socket={socket}/>
            <ChatForm socket={socket}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;