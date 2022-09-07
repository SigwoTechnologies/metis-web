export type LegacyLoginResponse = {
  user: {
    address: string;
    alias: string;
  };
  token: string;
  message: 'Access Granted';
};
