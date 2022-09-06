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

    const {
      verified,
      job: { id },
    } = await this.authService.validateSignature({
      challenge: state.challenge,
      signature,
      publicKey: state.publicKeyArmored,
      password: state.password,
      passphrase: state.passphrase,
      address: state.address,
    });

    if (!verified) return { ...state, error: LoginError.InvalidSignature };

    localStorage.setItem('SIGNUP_JOB_ID', id.toString());
    return state;
  }
}
