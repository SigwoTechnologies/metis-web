import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleContainer: {
      padding: '1% 4%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
      backgroundColor: theme.colors.black1,
    },
    avatar: {
      width: '45px',
      height: '45px',
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
