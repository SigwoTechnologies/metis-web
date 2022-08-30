import LocalStorageService from '@metis/common/services/local-storage.service';
import AuthService from '../../services/auth.service';
import MetaMaskService from '../../services/metamask.service';
import LoginState from '../../types/login-state';
import GetChallengeCommand from '../commands/get-challenge-command';
import SignChallengeCommand from '../commands/sign-challenge-command';
import ExistingAccountDifferentDeviceInvoker from '../invokers/existing-account-different-device-invoker';
import IClient from './client.interface';

export default class ExistingAccountDifferentDeviceClient implements IClient {
  private readonly invoker: ExistingAccountDifferentDeviceInvoker;

  constructor(state: LoginState) {
    const metaMaskService = new MetaMaskService();
    const localStorageService = new LocalStorageService();
    const authService = new AuthService(localStorageService);

    const getChallengeCommand = new GetChallengeCommand(authService);
    const signChallengeCmd = new SignChallengeCommand(authService, metaMaskService);

    this.invoker = new ExistingAccountDifferentDeviceInvoker(
      state,
      getChallengeCommand,
      signChallengeCmd
    );
  }

  async execute(): Promise<LoginState> {
    return this.invoker.execute();
  }
}
