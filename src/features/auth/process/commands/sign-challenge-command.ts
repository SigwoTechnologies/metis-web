import appConfig from '@metis/common/configuration/app.config';
import constants from '@metis/common/configuration/constants';
import LoginError from '../../enums/login-error.enum';
import LoginFlow from '../../enums/login-flow.enum';
import IAuthService from '../../services/interfaces/auth-service.interface';
import IMetaMaskService from '../../services/interfaces/metamask-service.interface';
import { ExistingAccountSignResponse } from '../../types/existing-account-sign-response';
import LoginState from '../../types/login-state';
import ValidateSignatureResponse from '../../types/validate-signature-response';
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
    const data = await this.authService.validateSignature({
      challenge: state.challenge,
      signature,
      publicKey: state.publicKeyArmored,
      password: state.password,
      passphrase: state.passphrase,
      address: state.address,
    });

    if (state.flow === LoginFlow.NewAccount) {
      const {
        verified,
        job: { id },
      } = data as ValidateSignatureResponse;
      if (!verified) return { ...state, error: LoginError.InvalidSignature };

      localStorage.setItem('SIGNUP_JOB_ID', id.toString());
    }

    if (state.flow === LoginFlow.ExistingAccountSameDevice) {
      const { alias, accountRS, token } = data as ExistingAccountSignResponse;
      const stringifiedToken = JSON.stringify({ access_token: token });
      localStorage.setItem(constants.TOKEN, JSON.stringify(stringifiedToken));
      state.alias = alias;
      state.jupAddress = accountRS;
      state.isLoggedIn = true;
    }
    if (state.flow === LoginFlow.LegacyAccount) {
      const { alias, accountRS, token } = data as ExistingAccountSignResponse;
      const stringifiedToken = JSON.stringify({ access_token: token });
      localStorage.setItem(constants.TOKEN, JSON.stringify(stringifiedToken));
      state.alias = alias;
      state.jupAddress = accountRS;
      state.isLoggedIn = true;

      await fetch(`${appConfig.api.baseUrl}/v1/api/users/${accountRS}/e2e-public-keys`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`, // notice the Bearer before your token
        },
        body: JSON.stringify({
          e2ePublicKey: state.publicKeyArmored,
        }),
      });
    }

    return state;
  }
}
