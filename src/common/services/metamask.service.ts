import { encrypt } from '@metamask/eth-sig-util';
import { Buffer } from 'buffer';
import { bufferToHex } from 'ethereumjs-util';
import BusinessError from '../exceptions/business-error';

// TODO: Make sure that only metamask provider is supported by the app (avoid overrides)
// ref: https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

const { ethereum } = window;

const on = (event: string, callback: unknown) => {
  ethereum.on(event, callback);
};

const removeListener = (event: string, callback: unknown) => {
  ethereum.removeListener('accountsChanged', callback);
};

const requestAccounts = async (): Promise<string[]> =>
  window.ethereum.request({
    method: 'eth_requestAccounts',
  });

const signMessage = async (message: string, address: string) =>
  window.ethereum.request({
    method: 'personal_sign',
    params: [message, address],
  });

const getPublicKey = async (address: string): Promise<string> => {
  try {
    return await ethereum.request({
      method: 'eth_getEncryptionPublicKey',
      params: [address],
    });
  } catch (err: any) {
    console.log('getEncryptPublicKey|error', err);
    if (err.code === 4001) {
      throw new BusinessError(
        'We cannot encrypt anything without the key. Please approve and try again'
      );
    }

    throw err;
  }
};

const encryptMessage = (
  message: string,
  publicKey: string,
  version = 'x25519-xsalsa20-poly1305'
) => {
  try {
    const encrypted = encrypt({
      publicKey,
      data: message,
      version,
    });
    const encryptionString = JSON.stringify(encrypted);
    const buffer = Buffer.from(encryptionString);

    return bufferToHex(buffer);
  } catch (err: unknown) {
    console.log('encryptMessage|error', err);
    throw new BusinessError('An error has occurred while encrypting your identity.');
  }
};

const decryptMessage = async (message: string, address: string): Promise<string> => {
  try {
    return await ethereum.request({
      method: 'eth_decrypt',
      params: [message, address],
    });
  } catch (err: unknown) {
    console.log('decryptMessage|error', err);
    throw new BusinessError('An error has occurred while decrypting your identity.');
  }
};

export default {
  ethereum,
  on,
  removeListener,
  requestAccounts,
  signMessage,
  getPublicKey,
  encryptMessage,
  decryptMessage,
};
