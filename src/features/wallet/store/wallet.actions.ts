import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBalance, getTransactions } from '../services/wallet.service';

export const fetchBalance = createAsyncThunk('wallet/fetchBalance', getBalance);
export const fetchTransactions = createAsyncThunk('wallet/fetchTransactions', getTransactions);
