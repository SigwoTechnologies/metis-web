import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'src/store/hooks';
import { selectState } from 'src/features/auth/store/auth.slice';

const NonAuthRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { isLoggedIn } = useAppSelector(selectState);

  if (isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
};

export default NonAuthRoute;
