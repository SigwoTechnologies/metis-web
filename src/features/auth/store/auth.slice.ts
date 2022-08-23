import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@metis/store/types';
import { login } from './auth.actions';

export type AuthState = {
  isLoading: boolean;
  isLoggedIn: boolean;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    isLoggedIn: true,
  } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isLoggedIn = payload;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectState = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer;
