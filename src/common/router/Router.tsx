import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import EmptyStateChannel from '@metis/features/channels/components/empty-state-channel/EmptyStateChannel';
import Main from '@metis/layout/Main';
import AuthRoute from './auth-route/AuthRoute';
import Loader from './loader/Loader';
import NonAuthRoute from './non-auth-route/NonAuthRoute';

const Login = Loader(lazy(() => import('@metis/pages/login-page/LoginPage')));
const ChatContainer = Loader(lazy(() => import('@metis/pages/chat-page/ChatPage')));
const Status404 = Loader(lazy(() => import('@metis/pages/error-pages/Status404')));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/main" replace />,
  },
  {
    path: '/main',
    element: (
      <AuthRoute>
        <Main />
      </AuthRoute>
    ),
    children: [
      { index: true, element: <EmptyStateChannel /> },
      { path: ':channelName', element: <ChatContainer /> },
    ],
  },
  {
    path: 'auth',
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      {
        path: 'login',
        element: (
          <NonAuthRoute>
            <Login />
          </NonAuthRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Status404 />,
  },
];

export default routes;
