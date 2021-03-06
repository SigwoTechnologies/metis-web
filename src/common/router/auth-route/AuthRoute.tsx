import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@metis/store/hooks';
import { selectState } from '@metis/features/auth/store/auth.slice';

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { isLoggedIn } = useAppSelector(selectState);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  return children;
};

export default AuthRoute;
