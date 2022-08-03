import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UiState = {
  isLoading: boolean;
  toast: ToastState;
  notification: {
    text: string;
    open: boolean;
    type: 'success' | 'error';
  };
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
  notification: {
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
    openNotification: (state, { payload }) => {
      const { type, text } = payload;
      state.notification.text = text;
      state.notification.type = type;
      state.notification.open = true;
    },
    hideNotification: (state) => {
      state.notification.open = false;
    },
  },
});

export const { openToast, hideToast, openNotification, hideNotification } = slice.actions;
export const uiReducer = slice.reducer;
