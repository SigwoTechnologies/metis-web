import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    accountAvatar: {
      width: '4rem',
      height: '4rem',
      justifyContent: 'flex-start',
    },
    container: {
      '&:hover .icon': {
        opacity: '0.3',
      },
    },
    icon: {
      opacity: '0',
      '&:hover': {
        opacity: '1',
      },
      color: 'white',
      fontSize: '96%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      '-ms-transform': 'translate(-50%, -50%)',
      textAlign: 'center',
    },
  })
);

export default useStyles;
