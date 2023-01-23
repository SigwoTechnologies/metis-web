import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import useStyles from './SpinnerContainer.styles';

type Props = {
  children: React.ReactNode;
  isLoading: boolean;
};
export const SpinnerContainer: React.FC<Props> = ({ children, isLoading }) => {
  const classes = useStyles();

  if (isLoading) {
    return (
      <Box className={classes.container}>
        <CircularProgress size="1rem" sx={{ color: '#61D90C' }} />
      </Box>
    );
  }

  return <>{children}</>;
};
