import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, messagesSelectors } from '../slices/messagesSlice';
import { channelsSelectors } from '../slices/channelsSlice';

const Messages = () => {
  const dispatch = useDispatch();
  // const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector(({channels}) => channels.activeChannel);
  const activeChannel = useSelector((state) => channelsSelectors.selectById(state, currentChannelId)); 
  const messages = [
    { body: "1 message", channelId: 1, id: 1, username: "admin" },
    { body: "2 message", channelId: 1, id: 2, username: "admin" },
    { body: "3 message", channelId: 2, id: 3, username: "moder" },
    { body: "4 message", channelId: 2, id: 4, username: "moder" },
    { body: "5 message", channelId: 2, id: 5, username: "moder" },
    { body: "6 message", channelId: 2, id: 6, username: "moder" },
  ];

  const currentChannelMessages = messages.filter(({channelId}) => channelId === Number(currentChannelId));

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch])

  return (
    <>
      <div className="mb-4 p-3 shadow-lg small">
        <p className="m-0">
          <b># {activeChannel && `${activeChannel.name}`}</b>
        </p>
        <span className="text-muted">{`${currentChannelMessages.length} messages`}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {currentChannelMessages
          .map(({ body, username, id }) => {
            return (
              <div key={id} className="text-break mb-2">
                <b>{username}</b>: {body}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Messages;