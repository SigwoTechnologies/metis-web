import wordsHelper from '@metis/common/helpers/words/words-helper';
import LoginResponse from '../../types/login-state';
import ICommand from './command.interface';

export default class GenerateCredentialsCommand implements ICommand<LoginResponse> {
  async execute(state: LoginResponse): Promise<LoginResponse> {
    if (!state.password) state.password = wordsHelper.generateRandomPassword();
    if (!state.passphrase) state.passphrase = wordsHelper.generatePassphrase();

    return state;
  }
}
