import ICommand from './command.interface';
import LoginResponse, { LoginError } from '../../types/login-state';
import MetaMaskReceiver from '../receivers/metamask-receiver';

export default class EncryptWithMetaMaskCommand implements ICommand<LoginResponse> {
  private receiver: MetaMaskReceiver;

  constructor(_receiver: MetaMaskReceiver) {
    this.receiver = _receiver;
  }

  async execute(state: LoginResponse): Promise<LoginResponse> {
    if (!state.address) return { ...state, error: LoginError.RequiredAddress };
    if (!state.password) return { ...state, error: LoginError.RequiredPassword };
    if (!state.passphrase) return { ...state, error: LoginError.RequiredPassphrase };

    const publicKey = await this.receiver.getPublicKey(state.address);

    state.encryptedPassword = await this.receiver.encrypt(state.password, publicKey);
    state.encryptedPassphrase = await this.receiver.encrypt(state.passphrase, publicKey);

    return state;
  }
}
