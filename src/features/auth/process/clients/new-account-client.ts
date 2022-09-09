import LocalStorageService from '@metis/common/services/local-storage.service';
import AuthService from '../../services/auth.service';
import EncryiptionService from '../../services/encryption.service';
import MetaMaskService from '../../services/metamask.service';
import LoginState from '../../types/login-state';
import GenerateCredentialsCommand from '../commands/generate-credentials-command';
import GenerateKeysCommand from '../commands/generate-keys-command';
import GetChallengeCommand from '../commands/get-challenge-command';
import LocalStorageCommand from '../commands/local-storage-command';
import LocalStorageNewAccountCommand from '../commands/local-storage-new-account-command';
import LocalStorageParserCommand from '../commands/local-storage-parser-command';
import SignChallengeCommand from '../commands/sign-challenge-command';
import NewAccountInvoker from '../invokers/new-account-invoker';
import IClient from './client.interface';

export default class NewAccountClient implements IClient {
  private readonly invoker: NewAccountInvoker;

  constructor(state: LoginState) {
    const encryptionService = new EncryiptionService();
    const metaMaskService = new MetaMaskService();
    const localStorageService = new LocalStorageService();
    const authService = new AuthService(localStorageService);

    const validateLocalStorageCommand = new LocalStorageNewAccountCommand(localStorageService);
    const generateCredentialsCommand = new GenerateCredentialsCommand();
    const generateKeysCommand = new GenerateKeysCommand(encryptionService);
    const getChallengeCommand = new GetChallengeCommand(authService);
    const signChallengeCmd = new SignChallengeCommand(authService, metaMaskService);
    const localStorageCommand = new LocalStorageCommand(localStorageService, metaMaskService);
    const parseLocalStorageCredentialsCommand = new LocalStorageParserCommand(metaMaskService);

    this.invoker = new NewAccountInvoker(
      state,
      validateLocalStorageCommand,
      getChallengeCommand,
      generateCredentialsCommand,
      generateKeysCommand,
      signChallengeCmd,
      localStorageCommand,
      parseLocalStorageCredentialsCommand
    );
  }

  async execute(): Promise<LoginState> {
    return this.invoker.execute();
  }
}
