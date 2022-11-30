import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(
  createStyles({
    textInput: {
      height: '40px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '10px',
      padding: '0 !important',
      transition: 'ease-in-out 200ms',
      '&:hover': {
        borderBottom: 'none !important',
      },
      '&::before': {
        borderRadius: '10px',
        borderBottom: 'none !important',
      },
      '&::after': {
        border: 'none !important',
        borderRadius: '10px',
      },
    },
    formInput: {
      height: '40px',
      minWidth: '320px',
      borderRadius: '10px',
      borderBottom: '1px solid transparent',
      padding: '0',
      paddingLeft: '40px',
      transition: 'ease all 200ms',
      '&:focus': {
        borderBottom: '1px solid #61D90C',
        borderRadius: '10px',
      },
      '&:hover': {
        borderBottom: '1px solid #61D90C',
      },
      '&::before': {
        borderRadius: '10px',
      },
      '&::after': {
        borderRadius: '10px',
      },
      '@media(max-width:1024px)': {
        minWidth: '180px',
        paddingLeft: '40px',
      },
      '@media(max-width:768px)': {
        minWidth: '600px',
        paddingLeft: '10%',
      },
      '@media(max-width:500px)': {
        minWidth: '200px',
        paddingLeft: '40px',
      },
    },
    searchIcon: {
      height: '24px',
      width: '24px',
      position: 'absolute',
      left: '10px',
      color: '#16343c',
    },
  })
);

export default useStyles;
