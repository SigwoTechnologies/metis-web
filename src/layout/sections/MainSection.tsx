import React from 'react';
import Paper from '@mui/material/Paper';
import useStyles from './Section.styles';

type Props = {
  children: React.ReactNode;
};

const MainSection = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <Paper
      className={classes.main}
      square
      sx={{
        borderLeft: '0px !important',
        borderRight: '0px !important',
        boxShadow: 'none !important',
        transition: 'none !important',
      }}
    >
      {children}
    </Paper>
  );
};

export default MainSection;
