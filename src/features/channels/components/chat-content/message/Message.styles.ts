import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      marginTop: '1.5rem',
    },
    avatarContainer: {
      width: '10%',
      display: 'flex',
      justifyContent: 'center',
    },
    avatar: {
      width: '3rem',
      height: '3rem',
    },
    messageContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      backgroundColor: theme.colors.black1,
      padding: '0.5rem 0.7rem',
      maxWidth: '80%',
      minWidth: '30%',
      borderRadius: '0.5rem',
    },
    message: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      textAlign: 'justify',
      textJustify: 'inter-word',
      minHeight: '2.8rem',
      position: 'relative',
      width: '100%',
    },
    date: {
      position: 'absolute',
      right: 0,
      bottom: 0,
    },
    reply: {
      width: '100%',
      '& > div > div:nth-child(1)': {
        maxWidth: '100%',
        borderLeft: `0.2rem solid ${theme.colors.blue1}`,
        marginBottom: '0.5rem',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    },
  })
);

export default useStyles;
