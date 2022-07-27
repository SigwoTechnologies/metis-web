import BusinessError from '@metis/common/exceptions/business-error';
import LoginState, { LoginError, LoginFlow } from '../../types/login-state';
import AuthReceiver from '../receivers/auth-receiver';
import ICommand from './command.interface';

export default class GetChallengeCommand implements ICommand<LoginState> {
  private receiver: AuthReceiver;

  constructor(_receiver: AuthReceiver) {
    this.receiver = _receiver;
  }

  async execute(state: LoginState): Promise<LoginState> {
    if (!state.address) return { ...state, error: LoginError.RequiredAddress };

    try {
      state.challenge = await this.receiver.getChallenge(state.address);
      state.challengeMessage = this.receiver.getChallengeMessage(state.challenge);

      return state;
    } catch (err: unknown) {
      if (err instanceof BusinessError) {
        // TODO: Change hardcoded codes by enums
        if (err.getError().name === 'existing_account') {
          state.error = LoginError.DifferentFlow;
          state.flow = LoginFlow.ExistingAccountDifferentDevice;
          return state;
        }
      }
      throw err;
    }
  }
}
