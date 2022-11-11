import { SpinnerContainer } from '@metis/common/components/ui/spinner-container/SpinnerContainer';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { useEffect } from 'react';
import { findChannels } from '../../hooks/useGetChannels';
import { getMutedChannelAddresses } from '../../hooks/useGetMutedChannelAddresses';
import { selectChannelsVisibles } from '../../store/channel.slice';
import { ChannelListItem } from './channel-list-item/ChannelListItem';

const ChannelList = () => {
  const dispatch = useAppDispatch();
  const { filteredChannels, isLoading } = useAppSelector((state) => state.channel);
  const channelsVisibles = useAppSelector((state) => selectChannelsVisibles(state));
  const channelList = filteredChannels.length ? filteredChannels : channelsVisibles;

  useEffect(() => {
    dispatch(findChannels());
    dispatch(getMutedChannelAddresses());
  }, []);

  return (
    <SpinnerContainer isLoading={isLoading}>
      {channelList.map((channel) => (
        <ChannelListItem channel={channel} key={channel.channelAddress} />
      ))}
    </SpinnerContainer>
  );
};

export default ChannelList;
