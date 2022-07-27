import { enums } from 'openpgp';
import EncryiptionService from '../../services/encryption.service';

export default class EncryptionReceiver {
  private encryptionService: EncryiptionService;

  constructor(_encryptionService: EncryiptionService) {
    this.encryptionService = _encryptionService;
  }

  async generateKeyPairs(address: string, passphrase: string) {
    const { privateKey: privateKeyArmored, publicKey: publicKeyArmored } =
      await this.encryptionService.generateKeyPairs(address, passphrase);

    return { privateKeyArmored, publicKeyArmored };
  }

  async generatePrivateKey(passphrase: string, privateKeyArmored: string) {
    const config = {
      preferredHashAlgorithm: enums.hash.sha256,
      preferredSymmetricAlgorithm: enums.symmetric.aes128,
    };

    return this.encryptionService.decryptPrivateKey(passphrase, privateKeyArmored, config);
  }

  async generatePublicKey(publicKeyArmored: string) {
    return this.encryptionService.read(publicKeyArmored);
  }
}
