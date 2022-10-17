import type { RootState } from '@metis/store/types';
import { createSlice } from '@reduxjs/toolkit';
import fetchBalance from '../services/fetchBalance';
import fetchTransactions from '../services/fetchTransactions';
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
    setLoading: (state: TWalletState, { payload: status }) => {
      state.isLoading = status;
    },
    setIsOpenWallet: (state: TWalletState, { payload: status }) => {
      state.isOpenWallet = status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      state.balance = action.payload;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
  },
});

export const selectState = (state: RootState) => state.channel;
export const { setIsOpenWallet, setLoading } = slice.actions;
export const walletReducer = slice.reducer;
