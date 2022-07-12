import { AnyAction } from '@reduxjs/toolkit';
import { uiReducer, UiState } from './ui.slice';

describe('Ui Slice', () => {
  let initialState: UiState;

  beforeAll(() => {
    initialState = {
      isLoading: false,
      toast: {
        text: '',
        open: false,
        type: 'success',
      },
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
