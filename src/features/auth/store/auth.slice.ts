import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@metis/store/types';
import { login } from './auth.actions';

type UserData = {
  password: string;
  passphrase: string;
  privateKeyArmored: string;
  publicKeyArmored: string;
};

type JupAccount = {
  address: string;
  alias: string;
};

export type AuthState = {
  isLoggedIn: boolean;
  isConnectingToMetamask: boolean;
  isCreatingAccount: boolean;
  userData: UserData;
  jupAccount: JupAccount;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
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
  } as AuthState,
  reducers: {
    setLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload;
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
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isConnectingToMetamask = false;
      state.isCreatingAccount = true;
      const { password, passphrase, privateKeyArmored, publicKeyArmored } = payload;
      state.userData = {
        ...state.userData,
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
export const { setLoggedIn, setJupAccount, setIsConnectingToMetamask, setIsCreatingAccount } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
