import { Manager } from 'socket.io-client';
import appConfig from '../configuration/app.config';

type props = {
  url?: string;
  query?: {
    room: string;
    user: string;
  };
};

const connect = ({ query, url = appConfig.api.baseUrl }: props) =>
  new Manager(url, {
    autoConnect: false,
    forceNew: true,
    query,
  });

export default connect;
