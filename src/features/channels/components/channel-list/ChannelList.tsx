import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { useEffect } from 'react';

import Spinner from '@metis/common/components/ui/spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import ChannelListItem from './channel-list-item/ChannelListItem';

import { findChannels } from '../../store/channel.actions';
import { selectChannel, selectState } from '../../store/channel.slice';
import { Channel } from '../../types/channel';
import { NewChannel } from '../../types/newChannel';

const ChannelList = () => {
  const dispatch = useAppDispatch();
  const { channels, isLoading, selectedChannel } = useAppSelector(selectState);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(findChannels());
  }, []);

  const selectNewChannel = (channel: Channel | NewChannel) => {
    dispatch(selectChannel(channel.channelName));
    navigate(`/main/${channel.channelName}`);
  };

  return (
    <Spinner isLoading={isLoading}>
      {channels.map((channel) => (
        <ChannelListItem
          channel={channel}
          key={channel.channelName}
          name={channel.channelName}
          message={`${channel.channelName} says: visit my page!`}
          date="08:34 AM"
          onClick={() => selectNewChannel(channel)}
          selected={selectedChannel.channelAddress === channel.channelAddress}
        />
      ))}
    </Spinner>
  );
};

export default ChannelList;
