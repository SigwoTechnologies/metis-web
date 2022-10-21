import { useAppSelector, useAppDispatch } from '@metis/store/hooks';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Channel } from '../types/channel';
import { loadChannelsMessages } from '../store/channel.actions';

const initialChannelState = {
  channelAddress: '',
  channelPublicKey: '',
  channelName: '',
  createdBy: '',
  createdAt: 0,
  messages: [],
};

export default () => {
  const { channelAddress } = useParams();
  const dispatch = useAppDispatch();
  const {
    userData: { privateKeyArmored, passphrase },
  } = useAppSelector((state) => state.auth);
  const [selectedChannel, setSelectedChannel] = useState<Channel>(initialChannelState);

  const { channels } = useAppSelector((state) => state.channel);

  useEffect(() => {
    if (channelAddress)
      dispatch(loadChannelsMessages({ channelAddress, privateKeyArmored, passphrase }));

    const targetChannel = channels.find((channel) => channel.channelAddress === channelAddress);
    if (!targetChannel || !channelAddress) {
      setSelectedChannel(initialChannelState);
      return;
    }

    setSelectedChannel(targetChannel);
  }, [channelAddress]);

  return selectedChannel;
};
