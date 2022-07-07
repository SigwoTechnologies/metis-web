import { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import NProgress from 'nprogress';
import useStyles from './SuspenseLoader.styles';

const SuspenseLoader = () => {
  const classes = useStyles();

  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box className={classes.container}>
      <CircularProgress size={64} disableShrink thickness={3} />
    </Box>
  );
};

export default SuspenseLoader;
