import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export type UiState = {
  isLoading: boolean;
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
    openToast: (state, { payload }: PayloadAction<ToastPayload>) => {
      const { type, text } = payload;
      // eslint-disable-next-line security/detect-object-injection
      toast[type](text, {
        theme: 'colored',
      });
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

export const { openToast, openNotification, hideNotification } = slice.actions;
export const uiReducer = slice.reducer;
