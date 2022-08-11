import wordsHelper from '@metis/common/helpers/words/words-helper';
import LoginResponse from '../../types/login-state';
import ICommand from './command.interface';

export default class GenerateCredentialsCommand implements ICommand<LoginResponse> {
  async execute(state: LoginResponse): Promise<LoginResponse> {
    state.password = wordsHelper.generateRandomPassword();
    state.passphrase = wordsHelper.generatePassphrase();
    return state;
  }
}
