import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useLayoutEffect } from 'react';

import useHttp from '@metis/common/hooks/useHttp';
import AuthService from '@metis/features/auth/services/auth.service';

import 'react-toastify/dist/ReactToastify.css';
import LocalStorageService from '@metis/common/services/local-storage.service';
import LeftColumn from './columns/LeftColumn';
import RightColumn from './columns/RightColumn';
import useStyles from './Main.styles';

const Main = () => {
  const classes = useStyles();
  const { getHttpService, requestInterceptor, responseInterceptor } = useHttp();

  useLayoutEffect(() => {
    const localStorageService = new LocalStorageService();
    const authService = new AuthService(localStorageService);
    const token = authService.getToken();
    const httpInstance = getHttpService();
    const request = requestInterceptor(httpInstance, token);
    const response = responseInterceptor(httpInstance);

    return () => {
      httpInstance.interceptors.request.eject(request);
      httpInstance.interceptors.response.eject(response);
    };
  }, [getHttpService, requestInterceptor, responseInterceptor]);

  return (
    <Box height="100vh" className={classes.wrapper}>
      <Container maxWidth="xl" component="main" className={classes.container}>
        <Grid container columnSpacing={5} className={classes.grid}>
          <Grid item xs={12} md={4} className={classes.gridRow}>
            <LeftColumn />
          </Grid>
          <Grid item md={8} className={classes.gridRow} sx={{ paddingLeft: '0px !important' }}>
            <RightColumn />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Main;
