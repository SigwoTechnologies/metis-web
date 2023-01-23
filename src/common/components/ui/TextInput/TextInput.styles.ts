import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    textField: {
      width: '100%',
      marginBottom: '1.5rem',
    },
    textInput: {
      '&:focus': {
        borderBottom: '1px solid #61D90C',
        borderRadius: '10px',
      },
      '&::before': {
        border: '0px !important',
      },
      borderRadius: '10px',
      borderBottom: '1px solid transparent',
      transition: 'linear 200ms',
      '&:hover': {
        borderBottom: '1px solid #61D90C',
      },
      '&::after': {
        border: '0px !important',
        borderRadius: '10px',
      },
    },
  })
);

export default useStyles;
