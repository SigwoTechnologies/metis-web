import React from 'react';
import Paper from '@mui/material/Paper';
import useStyles from './Section.styles';

type Props = {
  children: React.ReactNode;
};
const HeaderSection = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <Paper
      className={classes.header}
      square
      sx={{
        paddingLeft: '0 !important',
      }}
    >
      {children}
    </Paper>
  );
};
export default HeaderSection;
