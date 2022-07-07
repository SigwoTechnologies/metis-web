import { LazyExoticComponent, Suspense } from 'react';
import SuspenseLoader from '../suspense-loader/SuspenseLoader';

const Loader = (Component: LazyExoticComponent<() => JSX.Element>) => () =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component />
    </Suspense>
  );

export default Loader;
