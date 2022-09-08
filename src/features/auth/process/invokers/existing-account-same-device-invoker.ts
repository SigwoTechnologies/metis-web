import LoginState from '@metis/features/auth/types/login-state';
import ICommand from '../commands/command.interface';

export default class ExistingAccountSameDeviceInvoker {
  constructor(
    private state: LoginState,
    private onDecryptCredentials: ICommand<LoginState>,
    private onGetChallenge: ICommand<LoginState>,
    private onSignChallenge: ICommand<LoginState>
  ) {}

  async execute() {
    this.state = await this.onDecryptCredentials.execute(this.state);

    if (!this.state.error) this.state = await this.onGetChallenge.execute(this.state);

    if (!this.state.error) this.state = await this.onSignChallenge.execute(this.state);

    return this.state;
  }
}
