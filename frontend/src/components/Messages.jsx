import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, messagesSelectors, addMessage } from '../slices/messagesSlice';
import { channelsSelectors } from '../slices/channelsSlice';
import io from 'socket.io-client';

const socket = io.connect();

const Messages = () => {
  const dispatch = useDispatch();
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector((state) => state.channels.activeChannel);
  const activeChannel = useSelector((state) => channelsSelectors.selectById(state, currentChannelId));
  
  const currentChannelMessages = messages.filter(({channelId}) => channelId === currentChannelId);
  const messagesList = currentChannelMessages.map(({ body, username, id }) => {
    return (
      <div key={id} className="text-break mb-2">
        <b>{username}</b>: {body}
      </div>
    );
  });

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  socket.on('newMessage', (data) => {
    dispatch(addMessage(data));
  });

  return (
    <>
      <div className="mb-4 p-3 shadow-lg small">
        <p className="m-0">
          <b># {activeChannel && `${activeChannel.name}`}</b>
        </p>
        <span className="text-muted">{`${currentChannelMessages.length} messages`}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {messagesList}
      </div>
    </>
  );
};

export default Messages;