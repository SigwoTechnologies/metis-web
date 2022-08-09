import httpService from '@metis/common/services/http.service';

export type Invite = {
  invitationId: number;
  channelName: string;
  channelAddress: string;
  inviterAddress: string;
  inviterAlias: string;
  invitationSentAt: number;
};

const getUsersInvites = async (): Promise<Invite[]> => {
  const response = await httpService.get('/v1/api/channel/invites');
  return response.data;
};

const acceptInvite = async (channelAddress: string) => {
  const response = await httpService.post('/v1/api/channel/invite/accept', { channelAddress });
  return response.data;
};

// eslint-disable-next-line import/prefer-default-export
export default { acceptInvite, getUsersInvites };
