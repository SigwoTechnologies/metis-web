import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      marginTop: '1.5rem',
      gap: '0.75rem',
    },
    userContainer: {
      display: 'flex',
      marginTop: '1.5rem',
      gap: '0.75rem',
      justifyContent: 'end',
      flexDirection: 'row-reverse',
    },
    userName: {
      width: '8rem',
      marginBottom: '0.5rem',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    avatarContainer: {
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
      backgroundColor: '#0dc7fa3f',
      padding: '0.5rem 0.7rem',
      maxWidth: '80%',
      minWidth: '25%',
      borderRadius: '0.5rem',
      position: 'relative',
    },
    userMessageContainer: {
      // TODO: add this color to the theme
      backgroundColor: '#61d90c70!important',
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
      color: '#b7b7b7',
      fontSize: '0.7rem',
    },
    replyButton: {
      fontSize: '0.85rem',
      position: 'absolute',
      top: '0.5rem',
      right: '0.7rem',
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    },
  })
);

export default useStyles;
