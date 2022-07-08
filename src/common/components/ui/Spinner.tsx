import { CircularProgress } from '@mui/material';
import React from 'react';
import useStyles from './Spinner.styles';

const Spinner = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <CircularProgress />
    </div>
  );
};

export default Spinner;
