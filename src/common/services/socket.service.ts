import { Manager } from 'socket.io-client';
import appConfig from '../configuration/app.config';

type props = {
  url?: string;
  query?: {
    room: string;
    user?: string;
    event?: string;
  };
};

const connect = ({ query, url = appConfig.api.baseUrl }: props) =>
  new Manager(url, {
    forceNew: true,
    query,
  });

export default connect;
