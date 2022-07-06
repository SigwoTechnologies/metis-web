import React from 'react';
import Paper from '@mui/material/Paper';
import useStyles from './Section.styles';

type Props = {
  children: React.ReactNode;
};

const MainSection = ({ children }: Props) => {
  const classes = useStyles();
  return <Paper className={classes.main}>{children}</Paper>;
};

export default MainSection;
