import { Channel } from '@metis/features/channels/types/channel';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';

import Spinner from '@metis/common/components/ui/spinner/Spinner';
import useOnMount from '@metis/common/hooks/useOnMount';
import { useNavigate } from 'react-router-dom';
import ChannelListItem from './channel-list-item/ChannelListItem';

import { findChannels, getMutedChannelAddresses } from '../../store/channel.actions';
import { selectChannel, selectState } from '../../store/channel.slice';
import { NewChannel } from '../../types/newChannel';

const ChannelList = () => {
  const dispatch = useAppDispatch();
  const { channels, isLoading, selectedChannel, hiddenChannels } = useAppSelector(selectState);
  const hiddenChannelsAddreses = hiddenChannels.map((channel) => channel.channelAddress);
  const navigate = useNavigate();

  useOnMount(() => {
    dispatch(findChannels(null));
    dispatch(getMutedChannelAddresses(null));
  });

  const selectNewChannel = (channel: Channel) => {
    navigate(`/main/${channel.channelAddress}`);
  };

  return (
    <Spinner isLoading={isLoading}>
      {channels.map(
        (channel) =>
          !hiddenChannelsAddreses.includes(channel.channelAddress) && (
            <ChannelListItem
              channel={channel}
              key={channel.channelAddress}
              name={channel.channelName}
              message={channel.messages.length > 0 ? channel.messages[0].message.message : ''}
              date="08:34 AM"
              onClick={() => selectNewChannel(channel)}
              selected={selectedChannel.channelAddress === channel.channelAddress}
            />
          )
      )}
    </Spinner>
  );
};

export default ChannelList;
