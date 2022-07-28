import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';

import Spinner from '@metis/common/components/ui/spinner/Spinner';
import ChannelListItem from './channel-list-item/ChannelListItem';

import { selectChannel, selectState } from '../../store/channel.slice';
import { findChannels } from '../../store/channel.actions';

const ChannelList = () => {
  const dispatch = useAppDispatch();
  const { channels, isLoading, selectedChannel } = useAppSelector(selectState);

  useEffect(() => {
    dispatch(findChannels());
  }, []);

  return (
    <Spinner isLoading={isLoading}>
      {channels.map((channel) => (
        <ChannelListItem
          key={channel.channelName}
          name={channel.channelName}
          message={`${channel.channelName} says: visit my page!`}
          date="08:34 AM"
          isRead
          onClick={() => dispatch(selectChannel(channel.channelName))}
          selected={selectedChannel === channel.channelName}
        />
      ))}
    </Spinner>
  );
};

export default ChannelList;
