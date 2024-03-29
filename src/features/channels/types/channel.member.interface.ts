export type IChannelMember = {
  recordType: 'e2eChannelMemberPublicKeyRecord';
  memberAccountAddress: string;
  memberAccountAlias: string;
  e2ePublicKey: string;
  createdAt: number;
  version: number;
};
