import constants from '@metis/common/configuration/constants';
import ILocalStorageService from '@metis/common/services/interfaces/local-storage-service.interface';
// import { enums } from 'openpgp';
import LoginError from '../../enums/login-error.enum';
import IAuthService from '../../services/interfaces/auth-service.interface';
import LoginState from '../../types/login-state';
import ICommand from './command.interface';

export default class GenerateJwtCommand implements ICommand<LoginState> {
  private readonly authService: IAuthService;

  private readonly localStorageService: ILocalStorageService;

  constructor(_authService: IAuthService, _localStorageService: ILocalStorageService) {
    this.authService = _authService;
    this.localStorageService = _localStorageService;
  }

  async execute(state: LoginState): Promise<LoginState> {
    if (!state.passphrase) return { ...state, error: LoginError.RequiredPassphrase };
    if (!state.password) return { ...state, error: LoginError.RequiredPassword };

    const { passphrase, password } = state;
    const {
      token,
      user: { address, alias },
    } = await this.authService.legacyLogin(passphrase, password);
    this.localStorageService.setItem(constants.TOKEN, JSON.stringify({ access_token: token }));
    state.alias = alias;
    state.jupAddress = address;
    state.isLoggedIn = true;

    return state;
  }
}
