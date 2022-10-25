import connect from '@metis/common/services/socket.service';
import EncryiptionService from '@metis/features/auth/services/encryption.service';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import { PublicKey } from 'openpgp';
import { useEffect, useState } from 'react';
import channelService from '../services/channel.service';
import { AttachmentObj } from '../types/AttachmentObj';
import useSelectedChannel from './useSelectedChannel';

export default () => {
  const { reply } = useAppSelector((state) => state.channel);
  const { channelAddress: selectedChannelAddress } = useSelectedChannel();
  const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);
  const [loading, setLoading] = useState(false);
  const encryptionService = new EncryiptionService();
  const dispatch = useAppDispatch();
  const { alias } = useAppSelector((state) => state.auth.jupAccount);

  const fetchPublicKeys = async () => {
    setLoading(true);
    try {
      const channelMembers = await channelService.getChannelMembers(selectedChannelAddress);

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
    } finally {
      // TODO: what if the request fails? the user can still messages? they shouldn't
      setLoading(false);
    }
  };

  // Fetch the public keys everytime we select a channel
  useEffect(() => {
    const socket = connect({
      query: {
        room: selectedChannelAddress, // address of the current channel
        user: alias,
        event: 'newMemberChannel',
      },
    }).socket('/chat');

    socket.on('newMemberChannel', () => fetchPublicKeys());

    if (selectedChannelAddress) fetchPublicKeys();
  }, [selectedChannelAddress]);

  const sendEncryptedMessage = async ({ text }: { text: string }) => {
    const message = await encryptionService.createMsg(text);
    const armoredEncryptedMessage = await encryptionService.encryptMessage(message, publicKeys);

    const dataSendMessage = {
      message: armoredEncryptedMessage || text,
      address: selectedChannelAddress,
      mentions: [],
      ...reply,
    };

    return channelService.sendMessage(selectedChannelAddress, dataSendMessage);
  };

  const sendEncryptedMessageWithAttachment = async ({
    attachmentObj,
    channelAddress,
  }: {
    attachmentObj: AttachmentObj;
    channelAddress: string;
  }) => {
    const message = {
      message: 'attachment',
      address: channelAddress,
      mentions: [],
      attachmentObj,
      messageType: 'attachment',
      ...reply,
    };

    return channelService.sendMessage(channelAddress, message);
  };

  return { sendEncryptedMessage, sendEncryptedMessageWithAttachment, loading };
};
