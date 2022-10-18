import constants from '@metis/common/configuration/constants';
import ILocalStorageService from '@metis/common/services/interfaces/local-storage-service.interface';
import LoginError from '../../enums/login-error.enum';
import LoginFlow from '../../enums/login-flow.enum';
import LoginResponse from '../../types/login-state';
import ICommand from './command.interface';

export default class LocalStorageNewAccountCommand implements ICommand<LoginResponse> {
  private localStorageService: ILocalStorageService;

  constructor(_localStorageService: ILocalStorageService) {
    this.localStorageService = _localStorageService;
  }

  async execute(state: LoginResponse): Promise<LoginResponse> {
    const credentials = this.localStorageService.getItem<string>(constants.CREDENTIALS);

    if (credentials && [LoginFlow.NewAccount, LoginFlow.LegacyAccount].includes(state.flow)) {
      return {
        ...state,
        encryptedCredentials: credentials,
        error: LoginError.DifferentFlow,
        flow: LoginFlow.ExistingAccountSameDevice,
      };
    }

    if (credentials && state.flow === LoginFlow.ExistingAccountSameDevice) {
      return {
        ...state,
        encryptedCredentials: credentials,
      };
    }

    return state;
  }
}
