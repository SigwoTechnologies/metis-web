import { useAppSelector } from '@metis/store/hooks';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Channel } from '../types/channel';

const initialChannelState = {
  channelAddress: '',
  channelPublicKey: '',
  channelName: '',
  createdBy: '',
  createdAt: 0,
  messages: [],
};

export default () => {
  const { channels } = useAppSelector((state) => state.channel);
  const { channelAddress } = useParams();
  const [selectedChannel, setSelectedChannel] = useState<Channel>(initialChannelState);

  useEffect(() => {
    const targetChannel = channels.find((channel) => channel.channelAddress === channelAddress);
    if (!targetChannel || !channelAddress) {
      setSelectedChannel(initialChannelState);
      return;
    }

    setSelectedChannel(targetChannel);
  }, [channelAddress, channels]);

  return selectedChannel;
};
