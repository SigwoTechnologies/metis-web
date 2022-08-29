import LoginState from '@metis/features/auth/types/login-state';
import ICommand from '../commands/command.interface';

export default class NewAccountInvoker {
  constructor(
    private state: LoginState,
    private onValidateLocalStorage: ICommand<LoginState>,
    private onGetChallenge: ICommand<LoginState>,
    private onGenerateCredentials: ICommand<LoginState>,
    private onGenerateKeys: ICommand<LoginState>,
    private onEncryptWithMetaMask: ICommand<LoginState>,
    private onSignChallenge: ICommand<LoginState>,
    private onLocalStorage: ICommand<LoginState>,
    private onParseCeredentials: ICommand<LoginState>
  ) {}

  async execute() {
    this.state = await this.onValidateLocalStorage.execute(this.state);

    if (!this.state.error) this.state = await this.onParseCeredentials.execute(this.state);

    if (!this.state.error) this.state = await this.onGetChallenge.execute(this.state);

    if (!this.state.error) this.state = await this.onGenerateCredentials.execute(this.state);

    if (!this.state.error) this.state = await this.onGenerateKeys.execute(this.state);

    if (!this.state.error) this.state = await this.onEncryptWithMetaMask.execute(this.state);

    if (!this.state.error) this.state = await this.onSignChallenge.execute(this.state);

    // TODO: Remove this, we store the credential only after the account is created (socket event)
    // if (!this.state.error) this.state = await this.onLocalStorage.execute(this.state);

    return this.state;
  }
}
