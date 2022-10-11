import { AnyAction, CombinedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@metis/features/auth/store/auth.slice';
import { channelReducer } from '@metis/features/channels/store/channel.slice';
import { walletReducer } from '@metis/features/wallet/store/wallet.slice';
import { uiReducer } from './ui/ui.slice';

const combinedReducer = combineReducers({
  auth: authReducer,
  channel: channelReducer,
  ui: uiReducer,
  wallet: walletReducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: CombinedState<any>, action: AnyAction) =>
  combinedReducer(state, action);

const store = configureStore({
  reducer: rootReducer,
  devTools: true, // IMPORTANT: turn dev tools off on prod!
});

export default store;
