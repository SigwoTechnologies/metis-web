import LocalStorageService from '@metis/common/services/local-storage.service';
import AuthService from '../../services/auth.service';
import MetaMaskService from '../../services/metamask.service';
import LoginState from '../../types/login-state';
import GetChallengeCommand from '../commands/get-challenge-command';
import LocalStorageNewAccountCommand from '../commands/local-storage-new-account-command';
import LocalStorageParserCommand from '../commands/local-storage-parser-command';
import SignChallengeCommand from '../commands/sign-challenge-command';
import ExistingAccountSameDeviceInvoker from '../invokers/existing-account-same-device-invoker';
import IClient from './client.interface';

export default class ExistingAccountSameDeviceClient implements IClient {
  private readonly invoker: ExistingAccountSameDeviceInvoker;

  constructor(state: LoginState) {
    const metaMaskService = new MetaMaskService();
    const localStorageService = new LocalStorageService();
    const authService = new AuthService(localStorageService);

    const validateLocalStorageCommand = new LocalStorageNewAccountCommand(localStorageService);
    const getChallengeCommand = new GetChallengeCommand(authService);
    const signChallengeCmd = new SignChallengeCommand(authService, metaMaskService);
    const decryptCredentialsCommand = new LocalStorageParserCommand(metaMaskService);

    this.invoker = new ExistingAccountSameDeviceInvoker(
      state,
      validateLocalStorageCommand,
      decryptCredentialsCommand,
      getChallengeCommand,
      signChallengeCmd
    );
  }

  async execute(): Promise<LoginState> {
    return this.invoker.execute();
  }
}
