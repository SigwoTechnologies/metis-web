import BusinessError from '@metis/common/exceptions/business-error';
import LoginError from '../../enums/login-error.enum';
import LoginFlow from '../../enums/login-flow.enum';
import IAuthService from '../../services/interfaces/auth-service.interface';
import LoginState from '../../types/login-state';
import ICommand from './command.interface';

export default class GetChallengeCommand implements ICommand<LoginState> {
  private authService: IAuthService;

  constructor(_authService: IAuthService) {
    this.authService = _authService;
  }

  async execute(state: LoginState): Promise<LoginState> {
    if (!state.address) return { ...state, error: LoginError.RequiredAddress };

    try {
      state.challenge = await this.authService.getChallenge(state.address);
      state.challengeMessage = this.authService.getChallengeMessage(state.challenge);

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
