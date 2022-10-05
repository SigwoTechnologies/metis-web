/* eslint-disable no-unused-expressions */
import { useEffect } from 'react';

export default (onMount: () => void) =>
  useEffect(() => {
    if (onMount) {
      onMount();
    }
  }, []);
