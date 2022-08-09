import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routes from '@metis/common/router/Router';
import Notification from './common/components/ui/Notification';

const App = () => {
  const content = useRoutes(routes);

  return (
    <>
      <ToastContainer />
      <Notification />
      {content}
    </>
  );
};

export default App;
