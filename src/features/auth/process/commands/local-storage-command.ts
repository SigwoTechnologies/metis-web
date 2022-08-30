import constants from '@metis/common/configuration/constants';
import ILocalStorageService from '@metis/common/services/interfaces/local-storage-service.interface';
import LoginError from '../../enums/login-error.enum';
import IMetaMaskService from '../../services/interfaces/metamask-service.interface';
import EncryptedCredentials from '../../types/encrypted-credentials';
import LoginResponse from '../../types/login-state';
import ICommand from './command.interface';

export default class LocalStorageCommand implements ICommand<LoginResponse> {
  private readonly localStorageService: ILocalStorageService;

  private readonly metaMaskService: IMetaMaskService;

  constructor(_localStorageService: ILocalStorageService, _metamaskService: IMetaMaskService) {
    this.localStorageService = _localStorageService;
    this.metaMaskService = _metamaskService;
  }

  async execute(state: LoginResponse): Promise<LoginResponse> {
    if (!state.address) return { ...state, error: LoginError.RequiredAddress };
    if (!state.passphrase) return { ...state, error: LoginError.RequiredPassphrase };
    if (!state.password) return { ...state, error: LoginError.RequiredPassword };
    if (!state.privateKeyArmored) return { ...state, error: LoginError.RequiredPrivateKey };
    if (!state.publicKeyArmored) return { ...state, error: LoginError.RequiredPublicKey };

    const credentials: EncryptedCredentials = {
      passphrase: state.passphrase,
      password: state.password,
      privateKeyArmored: state.privateKeyArmored,
      publicKeyArmored: state.publicKeyArmored,
    };

    const metaMaskPublicKey = await this.metaMaskService.getPublicKey(state.address);
    const encrypted = await this.metaMaskService.encryptMessage(
      JSON.stringify(credentials),
      metaMaskPublicKey
    );

    this.localStorageService.setItem(constants.CREDENTIALS, encrypted);

    return state;
  }
}
