import { AnyAction, CombinedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/features/auth/store/auth.slice';
import { channelReducer } from '@/features/channels/store/channel.slice';
import { uiReducer } from './ui/ui.slice';

const combinedReducer = combineReducers({
  auth: authReducer,
  channel: channelReducer,
  ui: uiReducer,
});

const rootReducer = (state: CombinedState<any>, action: AnyAction) =>
  combinedReducer(state, action);

const store = configureStore({
  reducer: rootReducer,
  devTools: true, // IMPORTANT: turn dev tools off on prod!
});

export default store;
