import { Channel } from '@metis/features/channels/types/channel';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';

import { useEffect } from 'react';

import Spinner from '@metis/common/components/ui/spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { findChannels } from '../../store/channel.actions';
import ChannelListItem from './channel-list-item/ChannelListItem';

import { hideChannel, selectChannel, selectState } from '../../store/channel.slice';

const ChannelList = () => {
  const dispatch = useAppDispatch();
  const { channels, isLoading, selectedChannel, hiddenChannels } = useAppSelector(selectState);
  const hiddenChannelsAddreses = hiddenChannels.map((channel) => channel.channelAddress);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(findChannels());
  }, []);

  const onHideChannel = (channel: Channel) => {
    dispatch(hideChannel(channel));
  };

  const selectNewChannel = (channel: Channel) => {
    dispatch(selectChannel(channel));
    navigate(`/main/${channel.channelAddress}`);
  };

  return (
    <Spinner isLoading={isLoading}>
      {channels.map(
        (channel) =>
          !hiddenChannelsAddreses.includes(channel.channelAddress) && (
            <ChannelListItem
              key={channel.channelName}
              name={channel.channelName}
              message={`${channel.channelName} says: visit my page!`}
              date="08:34 AM"
              isRead
              onClick={() => selectNewChannel(channel)}
              selected={selectedChannel.channelAddress === channel.channelAddress}
            />
          )
      )}
    </Spinner>
  );
};

export default ChannelList;
