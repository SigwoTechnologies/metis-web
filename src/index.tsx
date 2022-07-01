import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <StyledEngineProvider injectFirst>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
