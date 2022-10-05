import BusinessError from '@metis/common/exceptions/business-error';
import LoginError from '../../enums/login-error.enum';
import IAuthService from '../../services/interfaces/auth-service.interface';
import { ExistingAccountChallengeResponse } from '../../types/existing-account-challenge-response';
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
        const { name: errorName, error } = err.getError();
        if (errorName === 'existing_account') {
          const { challenge } = error as ExistingAccountChallengeResponse;
          state.challenge = challenge;
          state.challengeMessage = this.authService.getChallengeMessage(state.challenge);

          return state;
        }
      }
      throw err;
    }
  }
}
