import { Manager } from 'socket.io-client';
import appConfig from '../configuration/app.config';

type props = {
  room: string;
  user: string;
};

const connect = ({ room, user }: props) =>
  new Manager(appConfig.api.baseUrl, {
    autoConnect: false,
    forceNew: true,
    query: {
      room,
      user,
    },
  });

export default connect;
