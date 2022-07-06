import React from 'react';
import Paper from '@mui/material/Paper';
import useStyles from './Section.styles';

type Props = {
  children: React.ReactNode;
};

const FooterSection = ({ children }: Props) => {
  const classes = useStyles();
  return <Paper className={classes.footer}>{children}</Paper>;
};

export default FooterSection;
