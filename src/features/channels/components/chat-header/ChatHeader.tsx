import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BugAvatar from 'src/assets/images/avatars/bug.jpg';
import ReneAvatar from 'src/assets/images/avatars/rene.jpg';
import useStyles from './ChatHeader.styles';

const ChatHeader = () => {
  const classes = useStyles();
  return (
    <Box className={classes.header}>
      <Box className={classes.avatarContainer}>
        <Avatar alt="Channel Avatar" src={BugAvatar} className={classes.avatar} />
      </Box>
      <Box className={classes.titleContainer}>
        <Typography variant="body1">Metis bugs report</Typography>
        <IconButton aria-label="channel settings" size="large">
          <MoreHorizIcon />
        </IconButton>
      </Box>
      <Box className={classes.account}>
        <Avatar alt="Channel Avatar" src={ReneAvatar} className={classes.accountAvatar} />
      </Box>
    </Box>
  );
};
export default ChatHeader;
