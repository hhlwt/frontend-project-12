import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels, channelsSelectors, setActiveChannel } from '../slices/channelsSlice';
import { Nav } from 'react-bootstrap';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector(({channels}) => channels.activeChannel);

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch])

  const channelsNavs = channels.map(({name, id}) => {
    return (
      <Nav.Item key={id}>
        <Nav.Link eventKey={id}># {name}</Nav.Link>
      </Nav.Item>
    );
  })

  return (
    <Nav activeKey={currentChannelId} 
      className="flex-column" 
      onSelect={(id) => dispatch(setActiveChannel(Number(id)))}
    >
      {channelsNavs}
    </Nav>
  );
};

export default Channels;