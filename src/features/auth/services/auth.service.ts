import BusinessError from '@metis/common/exceptions/business-error';
import httpService from '@metis/common/services/http.service';
import metamaskService from '@metis/common/services/metamask.service';
import { AliasResponse } from '../types/alias-response';
import { ChallengeResponse } from '../types/challenge-response';
import { ValidateSignatureResponse } from '../types/validate-signature-response';
import { getBufferString } from '../utils/auth.utils';

const endpoint = '/v1/api/crypto';

const getChallenge = async (address: string): Promise<string> => {
  try {
    const { data } = await httpService.get<ChallengeResponse>(
      `${endpoint}/create-challenge/${address}`
    );
    return data.challengeDigest;
  } catch (err: unknown) {
    // TODO: Log the error in a log service
    console.log('getChallenge|error', err);
    // TODO: Create codes enums and a better error response message
    throw new BusinessError('An error has occured while signing in', 'get_challenge');
  }
};

const getChallengeMessage = (challenge: string) => getBufferString(challenge);

const signMessage = async (message: string, address: string): Promise<string> => {
  try {
    return await metamaskService.signMessage(message, address);
  } catch (err) {
    console.log('signMessage|error', err);
    throw new BusinessError(
      'An error has occured while signing your message. Please try again.',
      'sign_message'
    );
  }
};
const validateSignature = async (message: string, signature: string): Promise<boolean> => {
  try {
    const payload = { challengeDigest: message, signature };
    const { data } = await httpService.post<ValidateSignatureResponse>(
      `${endpoint}/verify-signature`,
      payload
    );

    return data.verified;
  } catch (err: unknown) {
    // TODO: Log the error in a log service
    console.log('validateSignature|error', err);
    throw new BusinessError(
      'An error has occurred while validating your identity',
      'validate_signature'
    );
  }
};

const getAlias = async (address: string) => {
  try {
    const { data } = await httpService.get<AliasResponse>(`${endpoint}/get-alias/${address}`);

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
};

const createAccount = async (
  passphrase: string,
  password: string,
  blockchainAccountAddress: string
) => {
  try {
    const response = await httpService.post(`${endpoint}/create/account`, {
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
};

export default {
  getChallenge,
  getChallengeMessage,
  signMessage,
  validateSignature,
  getAlias,
  createAccount,
};
