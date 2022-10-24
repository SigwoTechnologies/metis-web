import useOnMount from '@metis/common/hooks/useOnMount';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { CircularProgress } from '@mui/material';
import { findChannels } from '../../hooks/useGetChannels';
import { getMutedChannelAddresses } from '../../hooks/useGetMutedChannelAddresses';
import ChannelListItem from './channel-list-item/ChannelListItem';

const ChannelList = () => {
  const dispatch = useAppDispatch();
  const { channels, isLoading, hiddenChannels } = useAppSelector((state) => state.channel);
  const hiddenChannelsAddreses = hiddenChannels.map((channel) => channel.channelAddress);

  useOnMount(() => {
    dispatch(findChannels(null));
    dispatch(getMutedChannelAddresses(null));
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      {channels.map(
        (channel) =>
          !hiddenChannelsAddreses.includes(channel.channelAddress) && (
            <ChannelListItem channel={channel} key={channel.channelAddress} />
          )
      )}
    </>
  );
};

export default ChannelList;
