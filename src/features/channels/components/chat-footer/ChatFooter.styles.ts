import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    footerInputStyle: {
      padding: '1rem 0',
    },
    button: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 0,
    },
  })
);

export default useStyles;
