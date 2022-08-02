export type NewChannel = {
  channelAddress: string;
  channelName: string;
  channelPublicKey: string;
  job: {
    id: number;
    createdAt: number;
    href: string;
  };
};
