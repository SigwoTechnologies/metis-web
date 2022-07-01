import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { uiReducer } from './ui/ui.slice';

const combinedReducer = combineReducers({
  ui: uiReducer,
});

const rootReducer = (state: any, action: any) => {
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: true, // IMPORTANT: turn dev tools off on prod!
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
