import routes from '@metis/common/router/Router';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Notification from './common/components/ui/Notification';
import { useCheckMetamask } from './features/auth/hooks/useCheckMetamask';

const App = () => {
  const content = useRoutes(routes);
  useCheckMetamask();
  return (
    <>
      <ToastContainer />
      <Notification />
      {content}
    </>
  );
};

export default App;
