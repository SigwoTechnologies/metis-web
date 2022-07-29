import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UiState = {
  isLoading: boolean;
  toast: ToastState;
};

// TODO: Move this type into a separate file
export type ToastState = {
  text: string;
  open: boolean;
  type: AlertColor;
};

const initialState: UiState = {
  isLoading: false,
  toast: {
    text: '',
    open: false,
    type: 'success',
  },
};

type ToastPayload = {
  text: string;
  type: AlertColor;
};

export const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openToast: (state, action: PayloadAction<ToastPayload>) => {
      const { type, text } = action.payload;
      state.toast.text = text;
      state.toast.type = type;
      state.toast.open = true;
    },
    hideToast: (state) => {
      state.toast.open = false;
    },
  },
});

export const { openToast, hideToast } = slice.actions;
export const uiReducer = slice.reducer;
