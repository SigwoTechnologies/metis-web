import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { io } from 'socket.io-client';

import routes from '@metis/common/router/Router';

const socket = io('http://localhost:8080');

const App = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('hey');
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const content = useRoutes(routes);
  return content;
};

export default App;
