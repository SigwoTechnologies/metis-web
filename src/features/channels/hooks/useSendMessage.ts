import EncryiptionService from '@metis/features/auth/services/encryption.service';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import { PublicKey } from 'openpgp';
import { useEffect, useState } from 'react';
import channelService from '../services/channel.service';

export default () => {
  const { selectedChannel } = useAppSelector((state) => state.channel);
  const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);
  const [loading, setLoading] = useState(false);
  const encryptionService = new EncryiptionService();
  const dispatch = useAppDispatch();

  // const decryptMessage = async (armoredEncryptedMessage: WebStream<string>) => {
  //   const encryptedMessage = await encryptionService.readMsg(armoredEncryptedMessage);
  //   const decryptedMessage = await encryptionService.decryptMessage(encryptedMessage, privateKey);

  //   console.log(decryptedMessage);
  // };

  // Fetch the public keys everytime we select a channel
  useEffect(() => {
    const fetchPublicKeys = async () => {
      try {
        const channelMembers = await channelService.getChannelMembers(
          selectedChannel.channelAddress
        );

        const publicKeysResponse = await Promise.all(
          channelMembers.map((member) => encryptionService.read(member.e2ePublicKey))
        );

        setPublicKeys(publicKeysResponse);
      } catch (e) {
        dispatch(
          openToast({
            text: 'There was a problem getting the channel members. Try later',
            type: 'error',
          })
        );
      }
    };

    if (selectedChannel.channelAddress) {
      setLoading(true);
      fetchPublicKeys().finally(() => setLoading(false));
    }
  }, [selectedChannel]);

  const sendEncryptedMessage = async (text: string) => {
    const message = await encryptionService.createMsg(text);
    const armoredEncryptedMessage = await encryptionService.encryptMessage(message, publicKeys);

    return channelService.sendMessage(
      selectedChannel.channelAddress,
      armoredEncryptedMessage as string
    );
  };

  return { sendEncryptedMessage, loading };
};