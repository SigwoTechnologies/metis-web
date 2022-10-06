import LocalStorageService from '@metis/common/services/local-storage.service';
import AuthService from '../../services/auth.service';
import EncryiptionService from '../../services/encryption.service';
import MetaMaskService from '../../services/metamask.service';
import LoginState from '../../types/login-state';
import GenerateKeysCommand from '../commands/generate-keys-command';
import GetChallengeCommand from '../commands/get-challenge-command';
import LocalStorageCommand from '../commands/local-storage-command';
import LocalStorageNewAccountCommand from '../commands/local-storage-new-account-command';
import SignChallengeCommand from '../commands/sign-challenge-command';
import LegacyAccountInvoker from '../invokers/legacy-account-invoker';
import IClient from './client.interface';

export default class LegacyAccountClient implements IClient {
  private readonly invoker: LegacyAccountInvoker;

  constructor(state: LoginState) {
    const encryptionService = new EncryiptionService();
    const metaMaskService = new MetaMaskService();
    const localStorageService = new LocalStorageService();
    const authService = new AuthService(localStorageService);

    const validateLocalStorageCommand = new LocalStorageNewAccountCommand(localStorageService);
    const getChallengeCommand = new GetChallengeCommand(authService);
    const generateKeysCommand = new GenerateKeysCommand(encryptionService);
    const signChallengeCmd = new SignChallengeCommand(authService, metaMaskService);
    const localStorageCommand = new LocalStorageCommand(localStorageService, metaMaskService);

    this.invoker = new LegacyAccountInvoker(
      state,
      validateLocalStorageCommand,
      getChallengeCommand,
      generateKeysCommand,
      signChallengeCmd,
      localStorageCommand
    );
  }

  async execute(): Promise<LoginState> {
    return this.invoker.execute();
  }
}
