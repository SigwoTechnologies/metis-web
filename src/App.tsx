import { useRoutes } from 'react-router-dom';

import routes from './common/router/router';

const App = () => {
  const content = useRoutes(routes);
  return content;
};

export default App;
