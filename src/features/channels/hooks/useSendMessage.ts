import httpService from '@metis/common/services/http.service';
import connect from '@metis/common/services/socket.service';
import EncryptionService from '@metis/features/auth/services/encryption.service';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import { PublicKey } from 'openpgp';
import { useEffect, useState } from 'react';
import { IAttachmentObj } from '../types/attachment.obj.interface';
import { useGetChannelMembers } from './useGetChannelMembers';

export default () => {
  const { reply } = useAppSelector((state) => state.channel);
  const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);
  const [loading, setLoading] = useState(false);
  const encryptionService = new EncryptionService();
  const dispatch = useAppDispatch();
  const { alias } = useAppSelector((state) => state.auth.jupAccount);
  const {
    selectedChannel: { channelAddress },
  } = useAppSelector((state) => state.channel);

  const fetchPublicKeys = async () => {
    setLoading(true);
    try {
      const channelMembers = await useGetChannelMembers(channelAddress);

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
        room: channelAddress, // address of the current channel
        user: alias,
        event: 'newMemberChannel',
      },
    }).socket('/chat');

    socket.on('newMemberChannel', () => fetchPublicKeys());

    if (channelAddress) fetchPublicKeys();
  }, [channelAddress]);

  const sendEncryptedMessage = async ({ text }: { text: string }) => {
    const message = await encryptionService.createMsg(text);
    const armoredEncryptedMessage = await encryptionService.encryptMessage(message, publicKeys);

    const dataSendMessage = {
      message: armoredEncryptedMessage || text,
      address: channelAddress,
      mentions: [],
      ...reply,
    };

    const response = await httpService.post(
      `/v1/api/channels/${channelAddress}/messages`,
      dataSendMessage
    );
    return response;
  };

  const sendEncryptedMessageWithAttachment = async ({
    attachmentObj,
  }: {
    attachmentObj: IAttachmentObj;
  }) => {
    const message = {
      message: 'attachment',
      address: channelAddress,
      mentions: [],
      attachmentObj,
      messageType: 'attachment',
      ...reply,
    };

    const response = await httpService.post(`/v1/api/channels/${channelAddress}/messages`, message);
    return response;
  };

  return { sendEncryptedMessage, sendEncryptedMessageWithAttachment, loading };
};
