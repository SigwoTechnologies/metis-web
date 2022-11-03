import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    accountAvatar: {
      width: '4rem',
      height: '4rem',
      justifyContent: 'flex-start',
    },
    icon: {
      color: 'white',
      fontSize: '96%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      '-ms-transform': 'translate(-50%, -50%)',
      textAlign: 'center',
      opacity: '0',
      transition: 'all 0.2s ease',
      '&:hover': {
        opacity: '1',
      },
    },
  })
);

export default useStyles;
