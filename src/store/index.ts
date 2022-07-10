import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { channelReducer } from 'src/features/channels/store/channel.slice';
import { uiReducer } from './ui/ui.slice';

const combinedReducer = combineReducers({
  channel: channelReducer,
  ui: uiReducer,
});

const rootReducer = (state: any, action: any) => combinedReducer(state, action);

const store = configureStore({
  reducer: rootReducer,
  devTools: true, // IMPORTANT: turn dev tools off on prod!
});

export default store;
