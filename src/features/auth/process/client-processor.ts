import LoginError from '../enums/login-error.enum';
import LoginState from '../types/login-state';
import ClientCreator from './clients/client-creator';

class ClientProcessor {
  async execute(state: LoginState): Promise<LoginState> {
    const client = ClientCreator.createClient(state);

    const response = await client.execute();

    if (response.error === LoginError.DifferentFlow) {
      response.error = null;
      return this.execute(response);
    }

    if (response.error) throw new Error('Custom message'); // TODO: Throw proper error here

    return response;
  }
}

export default ClientProcessor;
