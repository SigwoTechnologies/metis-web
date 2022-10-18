import LoginState from '@metis/features/auth/types/login-state';
import ICommand from '../commands/command.interface';

export default class ExistingAccountDifferentDeviceInvoker {
  constructor(
    private state: LoginState,
    private onGetChallenge: ICommand<LoginState>,
    private onSignChallenge: ICommand<LoginState>,
    private onLocalStorage: ICommand<LoginState>
  ) {}

  async execute() {
    this.state = await this.onGetChallenge.execute(this.state);

    if (!this.state.error) this.state = await this.onSignChallenge.execute(this.state);

    if (!this.state.error) this.state = await this.onLocalStorage.execute(this.state);

    return this.state;
  }
}
