import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleContainer: {
      height: '80px',
      padding: '2% 4%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.black1,
      '@media (max-width:768px)': {
        height: '60px',
      },
    },
    avatar: {
      width: '40px',
      height: '40px',
      '@media (max-width:900px)': {
        // eslint-disable-line no-useless-computed-key
        width: '25px',
        height: '25px',
      },
    },
    button: {
      width: '100%',
      marginBottom: '16px',
    },
    textField: {
      width: '100%',
      marginBottom: '16px',
      '@media (max-width:900px)': {
        // eslint-disable-line no-useless-computed-key
        fontSize: '0.5rem',
      },
    },
  })
);

export default useStyles;
