import { useState, useCallback } from 'react';

export default (initialState = false): [boolean, () => void] => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState((value) => !value), []);

  return [state, toggle];
};
