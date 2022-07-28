import { enums } from 'openpgp';
import ICommand from './command.interface';
import LoginState from '../../types/login-state';
import LoginError from '../../enums/login-error.enum';
import IEncryptionService from '../../services/interfaces/encryption-service.interface';

export default class GenerateKeysCommand implements ICommand<LoginState> {
  private encryptionService: IEncryptionService;

  constructor(_encryptionService: IEncryptionService) {
    this.encryptionService = _encryptionService;
  }

  async execute(state: LoginState): Promise<LoginState> {
    if (!state.address) return { ...state, error: LoginError.RequiredAddress };
    if (!state.passphrase) return { ...state, error: LoginError.RequiredPassphrase };

    const { privateKey: privateKeyArmored, publicKey: publicKeyArmored } =
      await this.encryptionService.generateKeyPairs(state.address, state.passphrase);

    const config = {
      preferredHashAlgorithm: enums.hash.sha256,
      preferredSymmetricAlgorithm: enums.symmetric.aes128,
    };

    state.privateKey = await this.encryptionService.decryptPrivateKey(
      state.passphrase,
      privateKeyArmored,
      config
    );
    state.publicKey = await this.encryptionService.read(publicKeyArmored);

    return state;
  }
}
