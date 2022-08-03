import { useAppDispatch, useAppSelector } from '@metis/store/hooks';

import Spinner from '@metis/common/components/ui/spinner/Spinner';
import useOnMount from '@metis/common/hooks/useOnMount';
import { useNavigate } from 'react-router-dom';
import ChannelListItem from './channel-list-item/ChannelListItem';

import { findChannels, getMutedChannelAddresses } from '../../store/channel.actions';
import { selectChannel, selectState } from '../../store/channel.slice';
import { Channel } from '../../types/channel';

const ChannelList = () => {
  const dispatch = useAppDispatch();
  const { channels, isLoading, selectedChannel } = useAppSelector(selectState);
  const navigate = useNavigate();

  useOnMount(() => {
    dispatch(findChannels());
    dispatch(getMutedChannelAddresses());
  });

  const selectNewChannel = (channel: Channel) => {
    dispatch(selectChannel(channel));
    navigate(`/main/${channel.channelAddress}`);
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
          isRead
          onClick={() => selectNewChannel(channel)}
          selected={selectedChannel.channelAddress === channel.channelAddress}
        />
      ))}
    </Spinner>
  );
};

export default ChannelList;
