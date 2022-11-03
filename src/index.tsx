import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';
import store from './store';
import App from './App';
import ThemeProvider from './theme/ThemeProvider';
import httpService from './common/services/http.service';

const fetcher = async (url: string) => httpService(url).then(({ data }) => data);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <SWRConfig value={{ fetcher }}>
      <CssBaseline />
      <StyledEngineProvider injectFirst>
        <ReduxProvider store={store}>
          <BrowserRouter>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </ReduxProvider>
      </StyledEngineProvider>
    </SWRConfig>
  </React.StrictMode>
);
