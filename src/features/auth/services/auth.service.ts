import constants from '@metis/common/configuration/constants';
import localStorageService from '@metis/common/services/local-storage.service';
import { Credential } from '../types/credential';

// TODO: Implement login logic with metamask here
const login = (password: string, passphrase: string): Promise<boolean> =>
  new Promise((resolve) => {
    resolve(true);
  });

const getLoggedInUserCredentials = (): Credential | undefined => {
  const storedCredentials =
    sessionStorage.getItem(constants.CREDENTIALS) ||
    localStorageService.getItem(constants.CREDENTIALS);

  if (!storedCredentials) return undefined;

  const credentials = JSON.parse(storedCredentials) as Credential;
  return credentials;
};

const getToken = (): string | undefined => {
  const credentials = getLoggedInUserCredentials();

  if (!credentials) return undefined;
  return credentials.access_token;
};

export default { login, getToken };
