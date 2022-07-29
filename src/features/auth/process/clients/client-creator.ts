import LoginFlow from '../../enums/login-flow.enum';
import LoginState from '../../types/login-state';
import IClient from './client.interface';
import ExistingAccountDifferentDeviceClient from './existing-account-different-device-client';
import ExistingAccountSameDeviceClient from './existing-account-same-device-client';
import LegacyAccountClient from './legacy-account-client';
import NewAccountClient from './new-account-client';

class ClientCreator {
  static createClient(state: LoginState): IClient {
    if (state.flow === LoginFlow.NewAccount) return new NewAccountClient(state);

    if (state.flow === LoginFlow.ExistingAccountSameDevice)
      return new ExistingAccountSameDeviceClient(state);

    if (state.flow === LoginFlow.ExistingAccountDifferentDevice)
      return new ExistingAccountDifferentDeviceClient(state);

    if (state.flow === LoginFlow.LegacyAccount) return new LegacyAccountClient(state);

    throw new Error('There is no client implementation for this flow.');
  }
}

export default ClientCreator;
