import AuthService from '../../services/auth.service';
import MetaMaskService from '../../services/metamask.service';
import LoginState from '../../types/login-state';
import GetChallengeCommand from '../commands/get-challenge-command';
import SignChallengeCommand from '../commands/sign-challenge-command';
import ExistingAccountSameDeviceInvoker from '../invokers/existing-account-same-device-invoker';
import IClient from './client.interface';

export default class ExistingAccountSameDeviceClient implements IClient {
  private readonly invoker: ExistingAccountSameDeviceInvoker;

  constructor(state: LoginState) {
    const metaMaskService = new MetaMaskService();
    const authService = new AuthService();

    const getChallengeCommand = new GetChallengeCommand(authService);
    const signChallengeCmd = new SignChallengeCommand(authService, metaMaskService);

    this.invoker = new ExistingAccountSameDeviceInvoker(
      state,
      getChallengeCommand,
      signChallengeCmd
    );
  }

  async execute(): Promise<LoginState> {
    return this.invoker.execute();
  }
}
