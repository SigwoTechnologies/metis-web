import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ToastState = {
  text: string;
  open: boolean;
  type: AlertColor;
};

type ToastPayload = {
  text: string;
  type: AlertColor;
};

const initialState: ToastState = {
  text: '',
  open: false,
  type: 'success',
};

export const slice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    openToast: (state, action: PayloadAction<ToastPayload>) => {
      const { type, text } = action.payload;
      state.text = text;
      state.type = type;
      state.open = true;
    },
    hideToast: (state) => {
      state.open = false;
    },
  },
});

export const { openToast, hideToast } = slice.actions;
export default slice.reducer;
