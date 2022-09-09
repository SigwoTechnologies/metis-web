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
  const { data } = await httpService.get('/v1/api/channel/invites');
  return data;
};

const acceptInvite = async (channelAddress: string) => {
  const { data } = await httpService.post('/v1/api/channel/invite/accept', { channelAddress });
  return data;
};

export default { acceptInvite, getUsersInvites };
