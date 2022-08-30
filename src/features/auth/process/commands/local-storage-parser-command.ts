import ICommand from './command.interface';
import LoginError from '../../enums/login-error.enum';
import LoginState from '../../types/login-state';
import EncryptedCredentials from '../../types/encrypted-credentials';
import IMetaMaskService from '../../services/interfaces/metamask-service.interface';

export default class LocalStorageParserCommand implements ICommand<LoginState> {
  private readonly metaMaskService: IMetaMaskService;

  constructor(_metaMaskService: IMetaMaskService) {
    this.metaMaskService = _metaMaskService;
  }

  async execute(state: LoginState): Promise<LoginState> {
    if (!state.encryptedCredentials) return state;
    if (!state.address) return { ...state, error: LoginError.RequiredAddress };

    const decryptedCreds = await this.metaMaskService.decryptMessage(
      state.encryptedCredentials,
      state.address
    );

    const { passphrase, password, privateKeyArmored, publicKeyArmored } = JSON.parse(
      decryptedCreds
    ) as EncryptedCredentials;

    state.passphrase = passphrase;
    state.password = password;
    state.privateKeyArmored = privateKeyArmored;
    state.publicKeyArmored = publicKeyArmored;

    return state;
  }
}
