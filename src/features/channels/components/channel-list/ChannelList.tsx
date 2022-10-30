import { SpinnerContainer } from '@metis/common/components/ui/spinner-container/SpinnerContainer';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { useEffect } from 'react';
import { findChannels } from '../../hooks/useGetChannels';
import { getMutedChannelAddresses } from '../../hooks/useGetMutedChannelAddresses';
import ChannelListItem from './channel-list-item/ChannelListItem';

const ChannelList = () => {
  const dispatch = useAppDispatch();
  const { channels, isLoading, hiddenChannels } = useAppSelector((state) => state.channel);
  const hiddenChannelsAddress = hiddenChannels.map((channel) => channel.channelAddress);

  useEffect(() => {
    dispatch(findChannels());
    dispatch(getMutedChannelAddresses());
  }, []);

  return (
    <SpinnerContainer isLoading={isLoading}>
      {channels.map(
        (channel) =>
          !hiddenChannelsAddress.includes(channel.channelAddress) && (
            <ChannelListItem channel={channel} key={channel.channelAddress} />
          )
      )}
    </SpinnerContainer>
  );
};

export default ChannelList;
