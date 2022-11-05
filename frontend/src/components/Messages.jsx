import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, messagesSelectors, addMessage } from '../slices/messagesSlice';
import { channelsSelectors } from '../slices/channelsSlice';
import { useTranslation } from 'react-i18next';

const Messages = ({ socket }) => {
  const {t} = useTranslation();
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

  const scrollToBottom = () => {
    const messagesContainer = document.getElementById('messages-box');
    messagesContainer.scrollTo({top: messagesContainer.scrollHeight})
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentChannelId, messages]);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  return (
    <>
      <div className="mb-4 p-3 shadow-lg small">
        <p className="m-0">
          <b>{activeChannel && `# ${activeChannel.name}`}</b>
        </p>
        <span className="text-muted">{t('chat.messagesCounter.count', { count: currentChannelMessages.length })}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {messagesList.reverse()}
      </div>
    </>
  );
};

export default Messages;