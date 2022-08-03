import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { Channel } from '@metis/features/channels/types/channel';

import Spinner from '@metis/common/components/ui/spinner/Spinner';
import { getChannelList , selectState } from '@metis/features/channels/store/channel.slice';
import ChannelListItem from './channel-list-item/ChannelListItem';

import { findChannels, hideChannel } from '../../store/channel.actions';

const ChannelList = () => {
  const dispatch = useAppDispatch();
  const { channels, isLoading } = useAppSelector(selectState);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    dispatch(findChannels());
    dispatch(getChannelList());
  }, []);

  const onHideChannel = (channel: Channel) => {
    hideChannel(channel);
  };

  return (
    <Spinner isLoading={isLoading}>
      {channels.map((channel) => (
        <ChannelListItem
          key={channel.channelName}
          name={channel.channelName}
          message={`${channel.channelName} says: visit my page!`}
          date="08:34 AM"
          isRead
          onClick={() => setSelected(channel.channelName)}
          onHideChannel={() => onHideChannel(channel)}
          selected={selected === channel.channelName}
        />
      ))}
    </Spinner>
  );
};

export default ChannelList;
