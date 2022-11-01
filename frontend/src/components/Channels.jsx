import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChannels, channelsSelectors, setActiveChannel, addChannel } from '../slices/channelsSlice';
import { ButtonGroup, Nav } from 'react-bootstrap';
import AddChannel from './AddChannel';
import Dropdown from 'react-bootstrap/Dropdown';
import DeleteChannel from './DeleteChannel';
import RenameChannel from './RenameChannel';

const Channels = ({ socket }) => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector(({channels}) => channels.activeChannel);

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel))
    dispatch(setActiveChannel(channel.id))
  })

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch])

  const channelsNavs = channels.map(({name, id, removable}) => {
    return removable ?
    (
      <Dropdown key={id} as={ButtonGroup} className="w-100">
        <Nav.Link className="text-truncate w-100" eventKey={id}># {name}</Nav.Link>
  
        <Dropdown.Toggle split className="toggle" id={`channel-group-${id}`} />
  
        <Dropdown.Menu>
          <DeleteChannel id={id} socket={socket}/>
          <RenameChannel id={id} socket={socket}/>
        </Dropdown.Menu>
      </Dropdown>
    )
    :
    (<Nav.Item key={id} className="w-100">
        <Nav.Link className="text-truncate" eventKey={id}># {name}</Nav.Link>
    </Nav.Item>); 
  })

  return (
    <>
      <div className="d-flex justify-content-between mb-3 ps-2 pe-2">
        <span>Channels</span>
        <AddChannel socket={socket} channels={channels}/>
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

