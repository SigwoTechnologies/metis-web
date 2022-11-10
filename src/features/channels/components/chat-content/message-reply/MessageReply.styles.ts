import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messageContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      backgroundColor: theme.colors.black1,
      padding: '0.5rem 0.7rem',
      maxWidth: '80%',
      minWidth: '25%',
      borderRadius: '0.5rem',
      position: 'relative',
    },
    message: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      textAlign: 'justify',
      textJustify: 'inter-word',
      position: 'relative',
      width: '100%',
    },
    date: {
      textAlign: 'right',
    },
    replyContainer: {
      // marginBottom: '0.5rem',
      // marginTop: '0.5rem',
      display: 'flex',
      alignItems: 'flex-start',
    },
    reply: {
      width: '100%',
      '& > div > div:nth-child(1)': {
        maxWidth: '100%',
        borderLeft: `0.2rem solid ${theme.colors.blue1}`,
        marginBottom: '0.5rem',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
  })
);

export default useStyles;
