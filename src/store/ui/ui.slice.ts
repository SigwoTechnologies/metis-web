import { createSlice } from '@reduxjs/toolkit';

export type UiState = {
  isLoading: boolean;
};

const initialState: UiState = {
  isLoading: false,
};

export const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {},
});

export const uiReducer = slice.reducer;
