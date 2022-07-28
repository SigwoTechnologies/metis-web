import LoginState from '@metis/features/auth/types/login-state';
import ICommand from '../../commands/command.interface';

export default class NewAccountInvoker {
  constructor(
    private state: LoginState,
    private onGetChallenge: ICommand<LoginState>,
    private onGenerateCredentials: ICommand<LoginState>,
    private onGenerateKeys: ICommand<LoginState>,
    private onEncryptWithMetaMask: ICommand<LoginState>,
    private onSignChallenge: ICommand<LoginState>
  ) {}

  async execute() {
    // eslint-disable-next-line no-debugger
    debugger;

    // Get challenge
    this.state = await this.onGetChallenge.execute(this.state);

    // Generate credentials
    if (!this.state.error) this.state = await this.onGenerateCredentials.execute(this.state);

    // Generate keys
    if (!this.state.error) this.state = await this.onGenerateKeys.execute(this.state);

    // Encrypt with  metamask
    if (!this.state.error) this.state = await this.onEncryptWithMetaMask.execute(this.state);

    // Sign challenge
    if (!this.state.error) this.state = await this.onSignChallenge.execute(this.state);

    // Suscribe to socket

    // Store in local storage

    return this.state;
  }
}
