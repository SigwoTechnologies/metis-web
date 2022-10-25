import LoginState from '@metis/features/auth/types/login-state';
import ICommand from '../commands/command.interface';

export default class LegacyAccountInvoker {
  constructor(
    private state: LoginState,
    private onValidateLocalStorage: ICommand<LoginState>,
    private onGetChallenge: ICommand<LoginState>,
    private onGenerateKeys: ICommand<LoginState>,
    private onSignChallenge: ICommand<LoginState>,
    private onLocalStorage: ICommand<LoginState>
  ) {}

  async execute() {
    this.state = await this.onValidateLocalStorage.execute(this.state);

    if (!this.state.error) this.state = await this.onGetChallenge.execute(this.state);

    if (!this.state.error) this.state = await this.onGenerateKeys.execute(this.state);

    if (!this.state.error) this.state = await this.onSignChallenge.execute(this.state);

    if (!this.state.error) this.state = await this.onLocalStorage.execute(this.state);

    return this.state;
  }
}
