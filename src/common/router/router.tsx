import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import Main from 'src/layout/Main';
import Loader from './loader/Loader';

const Login = Loader(lazy(() => import('src/pages/login/Login')));
const ChatContainer = Loader(lazy(() => import('src/pages/chat-container/ChatContainer')));
const Status404 = Loader(lazy(() => import('src/pages/error-pages/Status404')));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <ChatContainer />,
      },
    ],
  },
  { path: 'login', element: <Login /> },
  { path: '*', element: <Status404 /> },
];

export default routes;
