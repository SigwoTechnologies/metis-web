import {
  Message,
  PublicKey,
  PartialConfig,
  WebStream,
  PrivateKey,
  SerializedKeyPair,
  Key,
} from 'openpgp';

export default interface IEncryptionService {
  generateKeyPairs(
    address: string,
    passphrase: string
  ): Promise<SerializedKeyPair<string> & { revocationCertificate: string }>;

  createMsg(text: string): Promise<Message<string>>;

  encryptMessage(
    message: Message<string>,
    publicKeys: Array<PublicKey>
  ): Promise<WebStream<string>>;

  decryptPrivateKey(
    passphrase: string,
    privateKeyArmored: string,
    config: PartialConfig
  ): Promise<PrivateKey>;

  read(armoredKey: string): Promise<Key>;

  readMsg(encryptedMessage: WebStream<string>): Promise<Message<WebStream<string>>>;
}
