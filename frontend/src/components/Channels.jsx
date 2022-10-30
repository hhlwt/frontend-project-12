import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels, channelsSelectors, setActiveChannel, addChannel } from '../slices/channelsSlice';
import { Nav } from 'react-bootstrap';
import AddChannelButton from './AddChannelButton';

const Channels = ({ socket }) => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector(({channels}) => channels.activeChannel);

  socket.on('newChannel', (data) => {
    dispatch(addChannel(data))
  })

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch])

  const channelsNavs = channels.map(({name, id}) => {
    return (
      <Nav.Item key={id} className="w-100">
        <Nav.Link className="text-truncate" eventKey={id}># {name}</Nav.Link>
      </Nav.Item>
    );
  })

  return (
    <>
      <div className="d-flex justify-content-between mb-3 ps-2 pe-2">
        <span>Channels</span>
        <AddChannelButton socket={socket} channels={channels}/>
      </div>
      <Nav activeKey={currentChannelId} 
        className="column" 
        onSelect={(id) => dispatch(setActiveChannel(Number(id)))}
      >
        {channelsNavs}
      </Nav>
    </>
  );
};

export default Channels;