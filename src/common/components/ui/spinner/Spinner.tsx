import React from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import useStyles from './Spinner.styles';

type Props = {
  children: React.ReactNode;
  isLoading: boolean;
};
const Spinner: React.FC<Props> = ({ children, isLoading }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      {!isLoading && children}
      {isLoading && <CircularProgress className={classes.spinner} />}
    </Box>
  );
};

export default Spinner;
