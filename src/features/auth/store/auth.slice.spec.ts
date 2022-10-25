import { AnyAction } from '@reduxjs/toolkit';
import { authReducer, AuthState, selectState } from '@metis/features/auth/store/auth.slice';
import store from '@metis/store';
import { login } from './auth.actions';

describe('Auth Slice', () => {
  let initialState: AuthState;

  beforeEach(() => {
    initialState = {
      isLoggedIn: false,
      isConnectingToMetamask: false,
      isCreatingAccount: false,
      ethAccount: '',
      isConnectedToMetamask: false,
      hasMetamask: false,
      userData: {
        password: '',
        passphrase: '',
        privateKeyArmored: '',
        publicKeyArmored: '',
      },
      jupAccount: {
        address: '',
        alias: '',
      },
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
    // describe('and the response is successful', () => {
    //   it('should set the isConnectingToMetamask flag to false and the isCreatingAccount to true', () => {
    //     const expected = initialState;
    //     expected.isConnectingToMetamask = false;
    //     expected.isCreatingAccount = true;

    //     const actual = authReducer(initialState, login.fulfilled({}, '', '0x223233445456'));

    //     expect(actual).toEqual(expected);
    //   });
    // });
    describe('and the function fails', () => {
      it('should set the isConnectingToMetamask flag to false', () => {
        const expected = initialState;

        const actual = authReducer(initialState, login.rejected(null, '', '0x233244545656'));

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
