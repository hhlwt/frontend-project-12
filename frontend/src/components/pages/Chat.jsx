import React from 'react';
import Channels from '../Channels';
import Messages from '../Messages';

const Chat = () => {
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 chat-back-plate flex-md-row">
        <div className="col-4 col-md-2 border-channels pt-5 px-0 channels">
          <div className="d-flex justify-content-between mb-3 ps-2 pe-2">
            <span>Channels</span>
            <button type="button" className="p-0 text-light btn btn-group-vertical">+</button>
          </div>
          <Channels />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <Messages />
            <div className="mt-auto px-5 py-3">
              <form noValidate className="py-1 rounded-2">
                <div className="input-group has-validation">
                <input name="body"
                  id="chat-input"
                  aria-label="New message" 
                  placeholder="Enter a new message..." 
                  className="border-0 p-0 ps-2 form-control">
                </input>
                <button type="submit" className="btn btn-dark chat-btn">{'>'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;