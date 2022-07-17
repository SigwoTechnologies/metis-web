import CustomError from '@/common/exceptions/business-error';
import httpService from '@/common/services/http.service';

const endpoint = '/v1/api/crypto';

type ChallengeResponse = {
  challengeDigest: string;
};
const getChallenge = async (ethAddress: string): Promise<string> => {
  try {
    const { data } = await httpService.get<ChallengeResponse>(
      `${endpoint}/create-chall2enge/${ethAddress}`
    );
    return data.challengeDigest;
  } catch (err) {
    throw new CustomError('Hey whats up error!', 'some_error', '456');
  }
};

type ValidateSignatureResponse = {
  verified: boolean;
};
const validateSignature = async (message: string, signature: string) => {
  const payload = {
    challengeDigest: message,
    signature,
  };

  const { data } = await httpService.post<ValidateSignatureResponse>(
    `${endpoint}/verify-signature`,
    payload
  );
  return data.verified;
};

const getAlias = async (ethAddress: string) => {
  const response = await httpService.get(`${endpoint}/get-alias/${ethAddress}`);
  console.log('getAlias|response', response);
  return response;
};

const createAccount = async (
  passphrase: string,
  password: string,
  blockchainAccountAddress: string
) => {
  const response = await httpService.post(`${endpoint}/create/account`, {
    passphrase,
    password,
    blockchainAccountAddress,
  });
  console.log('response', response);
  return response;
};

export default { getChallenge, validateSignature, getAlias, createAccount };
