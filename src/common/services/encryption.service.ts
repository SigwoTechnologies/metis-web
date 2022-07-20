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

const generateKeyPairs = async (address: string, passphrase: string) =>
  generateKey({
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

const createMsg = async (text: string) => createMessage({ text });

const encryptMessage = (message: Message<string>, publicKeys: Array<PublicKey>) =>
  encrypt({
    message,
    encryptionKeys: publicKeys,
  });

const decryptMessage = async (message: Message<WebStream<string>>, privateKey: PrivateKey) => {
  const { data } = await decrypt({
    message,
    decryptionKeys: privateKey,
  });

  return data;
};

const decryptPrivateKey = async (
  passphrase: string,
  privateKeyArmored: string,
  config: PartialConfig
) => {
  const privateKey = await readPrivateKey({ armoredKey: privateKeyArmored, config });
  return decryptKey({
    privateKey,
    passphrase,
  });
};

const read = (armoredKey: string) => readKey({ armoredKey });

const readMsg = async (encryptedMessage: WebStream<string>) =>
  readMessage({
    armoredMessage: encryptedMessage,
  });

export default {
  generateKeyPairs,
  createMessage: createMsg,
  encryptMessage,
  decryptPrivateKey,
  readKey: read,
  readMessage: readMsg,
  decryptMessage,
};
