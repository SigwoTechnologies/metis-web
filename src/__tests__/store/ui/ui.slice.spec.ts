import { AnyAction } from '@reduxjs/toolkit';
import { uiReducer } from '../../../store/ui/ui.slice';

describe('Catalogs Slice', () => {
  let initialState: unknown;

  beforeAll(() => {
    initialState = {
      isLoading: false,
    };
  });

  describe('When loading slice', () => {
    it('should return the initial state', () => {
      const expected = initialState;

      const actual = uiReducer(undefined, {} as AnyAction);
      expect(actual).toEqual(expected);
    });
  });
});
