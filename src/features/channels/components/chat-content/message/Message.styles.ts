import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) =>
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
      alignSelf: 'end',
      justifyContent: 'end',
      flexDirection: 'row-reverse',
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
      backgroundColor: theme.colors.black1,
      padding: '0.5rem 0.7rem',
      maxWidth: '80%',
      minWidth: '30%',
      borderRadius: '0.5rem',
      position: 'relative',
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
    replyContainer: {
      marginBottom: '0.5rem',
      marginTop: '0.5rem',
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
    // speechBubble: {
    //   position: 'relative',
    //   background: '#00aabb',
    //   borderRadius: '.4em',
    //   '&:after': {
    //     content: '',
    //     position: 'absolute',
    //     right: 0,
    //     top: '50%',
    //     width: 0,
    //     height: 0,
    //     border: '20px solid transparent',
    //     borderLeftColor: '#00aabb',
    //     borderRight: 0,
    //     marginTop: '-20px',
    //     marginRight: '-20px'
    //   }
    // }
  })
);

export default useStyles;
