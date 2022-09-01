import {
  enums,
  readPrivateKey,
  decryptKey,
  generateKey,
  createMessage,
  Message,
  PublicKey,
  encrypt,
  PartialConfig,
  readKey,
  readMessage,
  WebStream,
  decrypt,
  PrivateKey,
} from 'openpgp';
import IEncryptionService from './interfaces/encryption-service.interface';

export default class EncryiptionService implements IEncryptionService {
  async generateKeyPairs(address: string, passphrase: string) {
    return generateKey({
      userIDs: [{ name: address }],
      passphrase,
      type: 'rsa',
      rsaBits: 2048,
      curve: 'ed25519',
      config: {
        showVersion: true,
        preferredHashAlgorithm: enums.hash.sha256,
        preferredSymmetricAlgorithm: enums.symmetric.aes128,
        preferredCompressionAlgorithm: enums.compression.zlib,
      },
    });
  }

  async createMsg(text: string): Promise<Message<string>> {
    return createMessage({ text });
  }

  async encryptMessage(message: Message<string>, publicKeys: Array<PublicKey>) {
    return encrypt({
      message,
      encryptionKeys: publicKeys,
    });
  }

  async decryptMessage(armoredMessage: string, passphrase: string, privateKeyArmored: string) {
    try {
      const privateKey = await this.decryptPrivateKey(passphrase, privateKeyArmored, {
        preferredHashAlgorithm: enums.hash.sha256,
        preferredSymmetricAlgorithm: enums.symmetric.aes128,
      });
      const encryptedMessage = await this.readMsg(armoredMessage);
      const { data: decryptedMessage } = await decrypt({
        message: encryptedMessage,
        decryptionKeys: privateKey,
      });

      return decryptedMessage as string;
    } catch (error) {
      // TODO: handle the error
      return '';
    }
  }

  async decryptPrivateKey(passphrase: string, privateKeyArmored: string, config: PartialConfig) {
    const privateKey = await readPrivateKey({ armoredKey: privateKeyArmored, config });
    return decryptKey({
      privateKey,
      passphrase,
    });
  }

  async read(armoredKey: string) {
    return readKey({ armoredKey });
  }

  async readMsg(encryptedMessage: WebStream<string>) {
    return readMessage({
      armoredMessage: encryptedMessage,
    });
  }
}
