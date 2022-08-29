import BusinessError from '@metis/common/exceptions/business-error';
import httpService from '@metis/common/services/http.service';
import constants from '@metis/common/configuration/constants';
import ILocalStorageService from '@metis/common/services/interfaces/local-storage-service.interface';
import IAuthService, { Signature } from './interfaces/auth-service.interface';
import AliasResponse from '../types/alias-response';
import ChallengeResponse from '../types/challenge-response';
import ValidateSignatureResponse from '../types/validate-signature-response';
import getBufferString from '../utils/auth.utils';
import Credential from '../types/credential';

export default class AuthService implements IAuthService {
  private readonly endpoint: string;

  private readonly localStorageService: ILocalStorageService;

  constructor(_localStorageService: ILocalStorageService) {
    this.endpoint = '/v1/api/crypto';
    this.localStorageService = _localStorageService;
  }

  async getChallenge(address: string): Promise<string> {
    try {
      const { data } = await httpService.get<ChallengeResponse>(
        `${this.endpoint}/get-account/${address}`
      );
      return data.challenge;
    } catch (err: unknown) {
      // TODO: Log the error in a log service
      console.log('getChallenge|error', err);
      // TODO: Create codes enums and a better error response message
      throw new BusinessError('An error has occured while signing in', 'get_challenge');
    }
  }

  getChallengeMessage(challenge: string) {
    return getBufferString(challenge);
  }

  async validateSignature({
    challenge,
    signature,
    password,
    passphrase,
    publicKey,
    address,
  }: Signature): Promise<boolean> {
    try {
      const payload = {
        challengeDigest: challenge,
        signature,
        password,
        passphrase,
        publicKey,
        blockchainAccountAddress: address,
      };
      const { data } = await httpService.post<ValidateSignatureResponse>(
        `${this.endpoint}/verify-signature`,
        payload
      );

      // TODO: data.verified is no longer valid
      // Now, there are two options, one is when the account does not exist, the account is going to be created and a socket will be emitted.
      // The second option will

      return data.verified;
    } catch (err: unknown) {
      // TODO: Log the error in a log service
      console.log('validateSignature|error', err);
      throw new BusinessError(
        'An error has occurred while validating your identity',
        'validate_signature'
      );
    }
  }

  async getAlias(address: string) {
    try {
      const { data } = await httpService.get<AliasResponse>(
        `${this.endpoint}/get-alias/${address}`
      );

      // TODO: Validate if the api can return undefined/null response
      if (data?.message.toLocaleLowerCase() === 'no available alias') return '';

      // TODO: What type of response does the api returns here?
      return data.message;
    } catch (err: unknown) {
      // TODO: Log the error in a log service
      console.log('getAlias|error', err);
      throw new BusinessError(
        'An error has occurred while while trying to connect to Metis servers',
        'get_alias'
      );
    }
  }

  async createAccount(passphrase: string, password: string, blockchainAccountAddress: string) {
    try {
      const response = await httpService.post(`${this.endpoint}/create/account`, {
        passphrase,
        password,
        blockchainAccountAddress,
      });
      console.log('response', response);
      return response.data;
    } catch (err: unknown) {
      // TODO: Log the error in a log service
      console.log('createAccount|error', err);
      throw new BusinessError(
        'An error has occured while creating your new account',
        'create_account'
      );
    }
  }

  getLoggedInUserCredentials(): Credential | undefined {
    const storedCredentials =
      sessionStorage.getItem(constants.CREDENTIALS) ||
      this.localStorageService.getItem(constants.CREDENTIALS);

    if (!storedCredentials) return undefined;

    const credentials = JSON.parse(storedCredentials) as Credential;
    return credentials;
  }

  getToken(): string | undefined {
    const credentials = this.getLoggedInUserCredentials();

    if (!credentials) return undefined;
    return credentials.access_token;
  }
}
