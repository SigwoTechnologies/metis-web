import routes from '@metis/common/router/Router';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Notification from './common/components/ui/Notification';
import { useCheckMetamask } from './features/auth/hooks/useCheckMetamask';
import { SyncAccount } from './features/auth/components/SyncAccount/SyncAccount';

const App = () => {
  const content = useRoutes(routes);
  useCheckMetamask();
  return (
    <>
      <SyncAccount />
      <ToastContainer />
      <Notification />
      {content}
    </>
  );
};

export default App;
