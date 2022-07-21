import { useRoutes } from 'react-router-dom';

import routes from '@metis/common/router/Router';

const App = () => {
  const content = useRoutes(routes);
  return content;
};

export default App;
