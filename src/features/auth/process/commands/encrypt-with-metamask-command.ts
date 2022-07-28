import ICommand from './command.interface';
import LoginError from '../../enums/login-error.enum';
import LoginState from '../../types/login-state';
import IMetaMaskService from '../../services/interfaces/metamask-service.interface';

export default class EncryptWithMetaMaskCommand implements ICommand<LoginState> {
  private metaMaskService: IMetaMaskService;

  constructor(_metaMaskService: IMetaMaskService) {
    this.metaMaskService = _metaMaskService;
  }

  async execute(state: LoginState): Promise<LoginState> {
    if (!state.address) return { ...state, error: LoginError.RequiredAddress };
    if (!state.password) return { ...state, error: LoginError.RequiredPassword };
    if (!state.passphrase) return { ...state, error: LoginError.RequiredPassphrase };

    const pubKey = await this.metaMaskService.getPublicKey(state.address);

    state.encryptedPassword = await this.metaMaskService.encryptMessage(state.password, pubKey);
    state.encryptedPassphrase = await this.metaMaskService.encryptMessage(state.passphrase, pubKey);

    return state;
  }
}
