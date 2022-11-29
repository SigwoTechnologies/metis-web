import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      width: '100%',
      marginBottom: '1rem',
      textTransform: 'capitalize',
    },
    textField: {
      width: '100%',
      marginBottom: '1rem',
    },
    iconContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    icon: {
      fontSize: '4rem',
    },
    closeIconContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '0 0 10px 10px !important',
    },
    closeIcon: {
      opacity: '1',
      '&:hover': {
        cursor: 'pointer',
        opacity: '0.8',
      },
    },
  })
);

export default useStyles;
