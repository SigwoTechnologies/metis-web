import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@metis/store/types';
import { login, register, verifyAlreadyRegistered } from './auth.actions';
import EncryptedCredentials from '../types/encrypted-credentials';
import { JupAccount } from '../types/JupAccount';

export type AuthState = {
  isLoggedIn: boolean;
  isConnectingToMetamask: boolean;
  isCreatingAccount: boolean;
  isConnectedToMetamask: boolean;
  ethAccount: string;
  hasMetamask: boolean;
  userData: EncryptedCredentials;
  jupAccount: JupAccount;
  isAlreadyRegistered: boolean;
  isCheckStatus: boolean;
};

const initialState: AuthState = {
  isLoggedIn: false,
  isConnectingToMetamask: false,
  isCreatingAccount: false,
  isConnectedToMetamask: false,
  ethAccount: '',
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
  isAlreadyRegistered: false,
  isCheckStatus: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    setUserData: (state, { payload }) => {
      state.userData = payload;
    },
    setHasMetamask: (state, { payload }) => {
      state.hasMetamask = payload;
    },
    setEthAccount: (state, { payload }) => {
      state.ethAccount = payload;
    },
    setJupAccount: (state, { payload }) => {
      state.jupAccount = payload;
    },
    setIsConnectingToMetamask: (state, { payload }) => {
      state.isConnectingToMetamask = payload;
    },
    setIsConnectedToMetamask: (state, { payload }) => {
      state.isConnectedToMetamask = payload;
    },
    setIsCreatingAccount: (state, { payload }) => {
      state.isCreatingAccount = payload;
    },
    signOut: () => {
      window.location.reload();
      localStorage.removeItem('TOKEN');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isConnectingToMetamask = false;
      const {
        password,
        passphrase,
        privateKeyArmored,
        publicKeyArmored,
        isLoggedIn,
        jupAddress,
        alias,
      } = payload;
      if (jupAddress && alias) {
        state.jupAccount = {
          address: jupAddress,
          alias,
        };
      }
      state.userData = {
        password,
        passphrase,
        privateKeyArmored,
        publicKeyArmored,
      };
      state.isLoggedIn = isLoggedIn ?? false;
    });
    builder.addCase(login.rejected, (state) => {
      state.isConnectingToMetamask = false;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.isConnectingToMetamask = false;
      state.isCreatingAccount = true;
      const {
        password,
        passphrase,
        privateKeyArmored,
        publicKeyArmored,
        isLoggedIn,
        jupAddress,
        alias,
      } = payload;
      if (jupAddress && alias) {
        state.jupAccount = {
          address: jupAddress,
          alias,
        };
      }
      state.userData = {
        password,
        passphrase,
        privateKeyArmored,
        publicKeyArmored,
      };
      state.isLoggedIn = isLoggedIn ?? false;
    });
    builder.addCase(register.rejected, (state) => {
      state.isConnectingToMetamask = false;
    });
    builder.addCase(verifyAlreadyRegistered.fulfilled, (state, { payload }) => {
      state.isAlreadyRegistered = payload;
      state.isCheckStatus = true;
    });
  },
});

export const selectState = (state: RootState) => state.auth;
export const {
  setLoggedIn,
  setJupAccount,
  setIsConnectingToMetamask,
  setIsCreatingAccount,
  setIsConnectedToMetamask,
  signOut,
  setUserData,
  setHasMetamask,
  setEthAccount,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
