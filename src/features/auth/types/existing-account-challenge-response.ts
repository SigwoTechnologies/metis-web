export type ExistingAccountChallengeResponse = {
  account: {
    aliasURI: string;
    aliasName: string;
    accountRS: string;
    alias: string;
    requestProcessingTime: number;
    account: string;
    timestamp: number;
  };
  challenge: string;
  blockchainAccountAddress: string;
};
