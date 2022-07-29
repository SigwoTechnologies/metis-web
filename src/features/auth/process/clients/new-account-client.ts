import AuthService from '../../services/auth.service';
import EncryiptionService from '../../services/encryption.service';
import MetaMaskService from '../../services/metamask.service';
import LoginState from '../../types/login-state';
import EncryptWithMetaMaskCommand from '../commands/encrypt-with-metamask-command';
import GenerateCredentialsCommand from '../commands/generate-credentials-command';
import GenerateKeysCommand from '../commands/generate-keys-command';
import GetChallengeCommand from '../commands/get-challenge-command';
import SignChallengeCommand from '../commands/sign-challenge-command';
import NewAccountInvoker from '../invokers/new-account-invoker';
import IClient from './client.interface';

export default class NewAccountClient implements IClient {
  private readonly invoker: NewAccountInvoker;

  constructor(state: LoginState) {
    const encryptionService = new EncryiptionService();
    const metaMaskService = new MetaMaskService();
    const authService = new AuthService();

    const generateCredentialsCommand = new GenerateCredentialsCommand();
    const generateKeysCommand = new GenerateKeysCommand(encryptionService);
    const encryptWithMetaMaskCommand = new EncryptWithMetaMaskCommand(metaMaskService);
    const getChallengeCommand = new GetChallengeCommand(authService);
    const signChallengeCmd = new SignChallengeCommand(authService, metaMaskService);

    this.invoker = new NewAccountInvoker(
      state,
      getChallengeCommand,
      generateCredentialsCommand,
      generateKeysCommand,
      encryptWithMetaMaskCommand,
      signChallengeCmd
    );
  }

  async execute(): Promise<LoginState> {
    return this.invoker.execute();
  }
}
