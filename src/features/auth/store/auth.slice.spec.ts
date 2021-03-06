import { AnyAction } from '@reduxjs/toolkit';
import { authReducer, AuthState, selectState } from '@metis/features/auth/store/auth.slice';
import store from '@metis/store';
import { login } from './auth.actions';

describe('Auth Slice', () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      isLoggedIn: false,
    };
  });

  describe('When loading slice', () => {
    it('should load the initial state', () => {
      const expected = initialState;

      const actual = authReducer(undefined, {} as AnyAction);

      expect(actual).toEqual(expected);
    });
  });

  describe('When login function is called', () => {
    describe('and the response is pending', () => {
      it('should set the isLoading flag to true', () => {
        const expected = initialState;
        expected.isLoading = true;

        const actual = authReducer(
          initialState,
          login.pending('', { password: 'dummy', passphrase: 'dummy' })
        );

        expect(actual).toEqual(expected);
      });
    });
    describe('and the response is successful', () => {
      it('should set the isLoggedIn flag to true', () => {
        const expected = initialState;
        expected.isLoading = false;
        expected.isLoggedIn = true;

        const actual = authReducer(
          initialState,
          login.fulfilled(true, '', { password: 'dummy', passphrase: 'dummy' })
        );

        expect(actual).toEqual(expected);
      });
    });
    describe('and the function fails', () => {
      it('should set the isLoading flag to false', () => {
        const expected = initialState;

        const actual = authReducer(
          initialState,
          login.rejected(null, '', { password: 'dummy', passphrase: 'dummy' })
        );

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('When selectState selector is called', () => {
    it('should return the auth state', () => {
      const expected = initialState;

      const actual = selectState(store.getState());

      expect(actual).toEqual(expected);
    });
  });
});
