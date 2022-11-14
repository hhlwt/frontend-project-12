import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonGroup, Nav, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  fetchChannels, channelsSelectors, setActiveChannel, selectActiveChannel,
} from '../../../slices/channelsSlice';
import AddChannelButton from './AddChannelButton';
import DeleteChannelButton from './DeleteChannelButton';
import RenameChannelButton from './RenameChannelButton';
import useAuth from '../../../hooks/useAuth';

const Channels = () => {
  const { userData } = useAuth();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannelId = useSelector(selectActiveChannel);

  useEffect(() => {
    dispatch(fetchChannels(userData));
  }, [dispatch, userData]);

  const channelsNavs = channels.map(({ name, id, removable }) => (removable
    ? (
      <Dropdown key={id} as={ButtonGroup} className="w-100">
        <Nav.Link className="text-truncate w-100" eventKey={id}>
          #
          {name}
        </Nav.Link>

        <Dropdown.Toggle split className="toggle" id={`channel-group-${id}`}>
          <span className="visually-hidden">Управление каналом</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <DeleteChannelButton id={id} />
          <RenameChannelButton id={id} channels={channels} name={name} />
        </Dropdown.Menu>
      </Dropdown>
    )
    : (
      <Nav.Item key={id} className="w-100">
        <Nav.Link className="text-truncate" eventKey={id}>
          #
          {name}
        </Nav.Link>
      </Nav.Item>
    )));

  return (
    <>
      <div className="d-flex justify-content-between mb-3 ps-2 pe-2">
        <span>{t('chat.channelsHeader')}</span>
        <AddChannelButton channels={channels} />
      </div>
      <Nav
        activeKey={currentChannelId}
        className="column"
        onSelect={(id) => dispatch(setActiveChannel(Number(id)))}
      >
        {channelsNavs}
      </Nav>
    </>
  );
};

export default Channels;
