import { encrypt } from '@metamask/eth-sig-util';
import { Buffer } from 'buffer';
import { bufferToHex } from 'ethereumjs-util';
import BusinessError from '@metis/common/exceptions/business-error';

export default class MetaMaskService {
  private ethereum: any;

  constructor() {
    this.ethereum = window.ethereum;
  }

  on(event: string, callback: unknown) {
    this.ethereum.on(event, callback);
  }

  removeListener(event: string, callback: unknown) {
    this.ethereum.removeListener('accountsChanged', callback);
  }

  async requestAccounts(): Promise<string[]> {
    return this.ethereum.request({
      method: 'eth_requestAccounts',
    });
  }

  async signMessage(message: string, address: string): Promise<string> {
    return window.ethereum.request({
      method: 'personal_sign',
      params: [message, address],
    });
  }

  async getPublicKey(address: string): Promise<string> {
    try {
      return await this.ethereum.request({
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
  }

  async encryptMessage(message: string, publicKey: string, version = 'x25519-xsalsa20-poly1305') {
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
  }

  async decryptMessage(message: string, address: string): Promise<string> {
    try {
      return await this.ethereum.request({
        method: 'eth_decrypt',
        params: [message, address],
      });
    } catch (err: unknown) {
      console.log('decryptMessage|error', err);
      throw new BusinessError('An error has occurred while decrypting your identity.');
    }
  }
}
