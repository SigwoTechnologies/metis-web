import useOnMount from '@metis/common/hooks/useOnMount';
import { Channel } from '@metis/features/channels/types/channel';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useSelectedChannel from '../../hooks/useSelectedChannel';
import { findChannels, getMutedChannelAddresses } from '../../store/channel.actions';
import { selectState } from '../../store/channel.slice';
import ChannelListItem from './channel-list-item/ChannelListItem';

const ChannelList = () => {
  const dispatch = useAppDispatch();
  const { channels, isLoading, hiddenChannels } = useAppSelector(selectState);
  const selectedChannel = useSelectedChannel();
  const hiddenChannelsAddreses = hiddenChannels.map((channel) => channel.channelAddress);
  const navigate = useNavigate();

  useOnMount(() => {
    dispatch(findChannels(null));
    dispatch(getMutedChannelAddresses(null));
  });

  const selectNewChannel = (channel: Channel) => {
    navigate(`/main/${channel.channelAddress}`);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      {channels.map(
        (channel) =>
          !hiddenChannelsAddreses.includes(channel.channelAddress) && (
            <ChannelListItem
              channel={channel}
              key={channel.channelAddress}
              onClick={() => selectNewChannel(channel)}
              selected={selectedChannel.channelAddress === channel.channelAddress}
            />
          )
      )}
    </>
  );
};

export default ChannelList;
