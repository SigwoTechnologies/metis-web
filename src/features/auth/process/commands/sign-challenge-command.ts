import LoginError from '../../enums/login-error.enum';
import IAuthService from '../../services/interfaces/auth-service.interface';
import IMetaMaskService from '../../services/interfaces/metamask-service.interface';
import LoginState from '../../types/login-state';
import ICommand from './command.interface';

export default class SignChallengeCommand implements ICommand<LoginState> {
  private readonly authService: IAuthService;

  private readonly metaMaskService: IMetaMaskService;

  constructor(_authService: IAuthService, _metaMaskService: IMetaMaskService) {
    this.authService = _authService;
    this.metaMaskService = _metaMaskService;
  }

  async execute(state: LoginState): Promise<LoginState> {
    if (!state.address) return { ...state, error: LoginError.RequiredAddress };
    if (!state.challenge) return { ...state, error: LoginError.RequiredChallenge };
    if (!state.challengeMessage) return { ...state, error: LoginError.RequiredChallengeMessage };

    const signature = await this.metaMaskService.signMessage(state.challengeMessage, state.address);
    const isValid = await this.authService.validateSignature(state.challenge, signature);

    if (!isValid) return { ...state, error: LoginError.InvalidSignature };

    return state;
  }
}
