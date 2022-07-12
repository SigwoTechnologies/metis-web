import { AnyAction } from '@reduxjs/toolkit';
import { openToast, uiReducer, UiState } from './ui.slice';

describe('Ui Slice', () => {
  let initialState: UiState;

  beforeEach(() => {
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

  describe('When toast is open', () => {
    it('it should set the text correctly', () => {
      const expected = initialState;
      expected.toast.text = 'hola mi wey';
      expected.toast.type = 'success';
      expected.toast.open = true;

      const actual = uiReducer(
        initialState,
        openToast({ text: expected.toast.text, type: expected.toast.type })
      );

      expect(actual.toast).toEqual(expected.toast);
    });
  });
});
