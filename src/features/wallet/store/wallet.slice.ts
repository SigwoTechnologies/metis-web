/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RootState } from '@metis/store/types';
import { createSlice } from '@reduxjs/toolkit';
import { TTransaction } from '../types/TTransaction';

export type TWalletState = {
  isLoading: boolean;
  isOpenWallet: boolean;
  transactions: TTransaction[];
  balance: number;
};

const initialState: TWalletState = {
  isLoading: false,
  isOpenWallet: false,
  transactions: [],
  balance: 0,
};

const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setTransactions: (state: TWalletState, { payload: transactions }) => {
      state.transactions = transactions;
    },
    setBalance: (state: TWalletState, { payload: balance }) => {
      state.balance = balance;
    },
    setLoading: (state: TWalletState, { payload: status }) => {
      state.isLoading = status;
    },
    setIsOpenWallet: (state: TWalletState, { payload: status }) => {
      state.isOpenWallet = status;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
  },
});

export const selectState = (state: RootState) => state.channel;
export const { setIsOpenWallet, setLoading, setTransactions, setBalance } = slice.actions;
export const walletReducer = slice.reducer;
