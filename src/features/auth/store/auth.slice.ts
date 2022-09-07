import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@metis/store/types';
import { login } from './auth.actions';
import EncryptedCredentials from '../types/encrypted-credentials';
import { JupAccount } from '../types/JupAccount';

export type AuthState = {
  isLoggedIn: boolean;
  isConnectingToMetamask: boolean;
  isCreatingAccount: boolean;
  userData: EncryptedCredentials;
  jupAccount: JupAccount;
};

const initialState: AuthState = {
  isLoggedIn: false,
  isConnectingToMetamask: false,
  isCreatingAccount: false,
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
    setJupAccount: (state, { payload }) => {
      state.jupAccount = payload;
    },
    setIsConnectingToMetamask: (state, { payload }) => {
      state.isConnectingToMetamask = payload;
    },
    setIsCreatingAccount: (state, { payload }) => {
      state.isCreatingAccount = payload;
    },
    signOut: () => {
      localStorage.removeItem('TOKEN');
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isConnectingToMetamask = false;
      state.isCreatingAccount = true;
      const { password, passphrase, privateKeyArmored, publicKeyArmored } = payload;
      state.userData = {
        password,
        passphrase,
        privateKeyArmored,
        publicKeyArmored,
      };
    });
    builder.addCase(login.rejected, (state) => {
      state.isConnectingToMetamask = false;
    });
  },
});

export const selectState = (state: RootState) => state.auth;
export const {
  setLoggedIn,
  setJupAccount,
  setIsConnectingToMetamask,
  setIsCreatingAccount,
  signOut,
  setUserData,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
