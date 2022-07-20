import { useRoutes } from 'react-router-dom';

import routes from '@metis/common/router/Router';
import Toast from '@metis/common/components/ui/Toast/Toast';

const App = () => {
  const content = useRoutes(routes);

  return (
    <>
      <Toast />
      {content}
    </>
  );
};

export default App;
