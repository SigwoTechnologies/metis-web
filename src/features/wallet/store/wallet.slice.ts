import type { RootState } from '@metis/store/types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchBalance, fetchTransactions } from './wallet.actions';
import { TTransaction } from '../types/TTransaction';

export type TWalletState = {
  isLoading: boolean;
  isLoadingTransaction: boolean;
  isOpenWallet: boolean;
  transactions: TTransaction[];
  balance: number;
};

const initialState: TWalletState = {
  isLoading: false,
  isLoadingTransaction: false,
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
    builder.addCase(fetchBalance.fulfilled, (state, { payload }) => {
      state.balance = payload;
    });
    builder.addCase(fetchTransactions.pending, (state) => {
      state.isLoadingTransaction = true;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, { payload }) => {
      state.isLoadingTransaction = false;
      state.transactions = payload;
    });
  },
});

export const selectState = (state: RootState) => state.channel;
export const { setIsOpenWallet, setLoading } = slice.actions;
export const walletReducer = slice.reducer;
