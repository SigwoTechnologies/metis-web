import LoginState, { LoginError } from '../../types/login-state';
import EncryptionReceiver from '../receivers/encryption-receiver';
import ICommand from './command.interface';

export default class GenerateKeysCommand implements ICommand<LoginState> {
  private receiver: EncryptionReceiver;

  constructor(_receiver: EncryptionReceiver) {
    this.receiver = _receiver;
  }

  async execute(state: LoginState): Promise<LoginState> {
    if (!state.address) return { ...state, error: LoginError.RequiredAddress };
    if (!state.passphrase) return { ...state, error: LoginError.RequiredPassphrase };

    const { privateKeyArmored, publicKeyArmored } = await this.receiver.generateKeyPairs(
      state.address,
      state.passphrase
    );

    state.privateKey = await this.receiver.generatePrivateKey(state.passphrase, privateKeyArmored);
    state.publicKey = await this.receiver.generatePublicKey(publicKeyArmored);

    return state;
  }
}
