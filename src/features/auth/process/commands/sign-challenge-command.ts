import LoginState, { LoginError } from '../../types/login-state';
import AuthReceiver from '../receivers/auth-receiver';
import MetaMaskReceiver from '../receivers/metamask-receiver';
import ICommand from './command.interface';

export default class SignChallengeCommand implements ICommand<LoginState> {
  private authReceiver: AuthReceiver;

  private metaMaskReceiver: MetaMaskReceiver;

  constructor(_authReceiver: AuthReceiver, _metaMaskReceiver: MetaMaskReceiver) {
    this.authReceiver = _authReceiver;
    this.metaMaskReceiver = _metaMaskReceiver;
  }

  async execute(state: LoginState): Promise<LoginState> {
    if (!state.address) return { ...state, error: LoginError.RequiredAddress };
    if (!state.challenge) return { ...state, error: LoginError.RequiredChallenge };
    if (!state.challengeMessage) return { ...state, error: LoginError.RequiredChallengeMessage };

    const signature = await this.metaMaskReceiver.sign(state.challengeMessage, state.address);

    const isValid = await this.authReceiver.validateSignature(state.challenge, signature);

    if (!isValid) return { ...state, error: LoginError.InvalidSignature };

    return state;
  }
}
