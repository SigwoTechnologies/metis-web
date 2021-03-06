import { useLayoutEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Toast from '@metis/common/components/ui/Toast/Toast';
import authService from '@metis/features/auth/services/auth.service';
import useHttp from '@metis/common/hooks/useHttp';

import LeftColumn from './columns/LeftColumn';
import RightColumn from './columns/RightColumn';
import useStyles from './Main.styles';

const Main = () => {
  const classes = useStyles();
  const { getHttpService, requestInterceptor, responseInterceptor } = useHttp();

  useLayoutEffect(() => {
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
    <>
      <Toast />
      <Box height="100vh" className={classes.wrapper}>
        <Container maxWidth="xl" component="main" className={classes.container}>
          <Grid container columnSpacing={0} className={classes.grid}>
            <Grid item xs={12} md={4} className={classes.gridRow}>
              <LeftColumn />
            </Grid>
            <Grid item md={8} className={classes.gridRow}>
              <RightColumn />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Main;
