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

export default class EncryiptionService {
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

  async createMsg(text: string) {
    return createMessage({ text });
  }

  async encryptMessage(message: Message<string>, publicKeys: Array<PublicKey>) {
    return encrypt({
      message,
      encryptionKeys: publicKeys,
    });
  }

  async decryptMessage(message: Message<WebStream<string>>, privateKey: PrivateKey) {
    const { data } = await decrypt({
      message,
      decryptionKeys: privateKey,
    });

    return data;
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
