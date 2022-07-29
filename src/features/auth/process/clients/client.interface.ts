import LoginState from '../../types/login-state';

interface IClient {
  execute(): Promise<LoginState>;
}

export default IClient;
