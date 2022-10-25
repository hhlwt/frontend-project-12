import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChannels, channelsSelectors } from '../../slices/channelsSlice';
import { fetchMessages, messagesSelectors } from '../../slices/messagesSlice';

const Homepage = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
  const channelsComps = channels.map(({name, id}) => {
    return (
      <li key={id}>
        <button type="button" className="w-100 text-start text-light btn">
          <span className="me-1">#</span>
          {name}
        </button>
      </li>
    );
  });
  const messagesComps = messages.map(({name, id}) => <h1 key={id}>{name}</h1>);

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchMessages());
  }, [dispatch]);

  return (
    <div className="container h-100 my-5 overflow-hidden rounded shadow">
      <div className="row h-100 chat flex-md-row">
        <div className="col-4 col-md-2 border-chat pt-5 px-0 channels">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Channels</span>
            <button type="button" className="p-0 text-light btn btn-group-vertical">+</button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            {channelsComps}
          </ul>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="mb-4 p-3 shadow-sm small">
              <p class="m-0">
                <b># general</b>
              </p>
              <span class="text-muted">0 messages</span>
            </div>
            <div id="messages-box" class="chat-messages overflow-auto px-5 ">
              {messagesComps.length ? messagesComps : <h1>No messages yet</h1>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;