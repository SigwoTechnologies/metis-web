import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    reject: {
      width: '13rem',
      backgroundColor: '#b21c12',
      color: '#ffff',
      transition: 'all 0.2s ease',
      '&:hover:before': {
        transform: 'scale(1.2)',
        filter: 'blur(3px)',
      },
      '&:hover': {
        backgroundColor: 'red',
        boxShadow: '0 0 20px white',
        color: 'black',
        fontSize: '1rem',
      },
    },
    grant: {
      width: '13rem',
      color: '#ffff',
      backgroundColor: '#378e1a',
      transition: 'all 0.2s ease',
      '&:hover:before': {
        transform: 'scale(1.2)',
        filter: 'blur(3px)',
      },
      '&:hover': {
        backgroundColor: '#5cff3c',
        boxShadow: '0 0 20px white',
        color: 'black',
        fontSize: '1rem',
      },
    },
    span: {
      fontWeight: 700,
      fontSize: '14px',
      textTransform: 'none',
    },
    textCenter: { textAlign: 'center' },
    spinner: {
      alignSelf: 'center',
    },
    button: {
      width: '100%',
      marginBottom: '1rem',
      textTransform: 'capitalize',
    },
    box: { display: 'flex', gap: '1rem' },
  })
);

export default useStyles;
