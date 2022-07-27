import PompAvatar from '@metis/assets/images/avatars/pomp.jpg';
import ReneAvatar from '@metis/assets/images/avatars/rene.jpg';
import Spinner from '@metis/common/components/ui/spinner/Spinner';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { discardReply } from '../../store/channel.slice';
import useStyles from './ChatContent.styles';
import MessageReply from './message-reply/MessageReply';
import Message from './message/Message';

const ChatContent = () => {
  // TODO: Remove this dummy loading state
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { active, message, name } = useAppSelector((state) => state.channel.reply);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Spinner isLoading={loading}>
        <div className={classes.container}>
          <Message name="Pompilio Fiore" message="Good morning" date="27/06/2022" color="#A36300" />
          <Message
            name="Rene Reyes"
            message="Good morning"
            date="10:31 PM"
            color="#44C553"
            avatar={ReneAvatar}
          />
          <Message
            name="Pompilio Fiore"
            message="How is it going?"
            date="10:32 PM"
            color="#A36300"
            avatar={PompAvatar}
          />
          <Message
            name="Rene Reyes"
            message="Not too bad, working on a smart contract, very interesting stuff.. what about you?"
            date="10:33 PM"
            color="#44C553"
            avatar={ReneAvatar}
          >
            <MessageReply
              name="Martin"
              message="How is it going? good how are you? "
              date="10:32 PM"
              color="#A36300"
            />
          </Message>
        </div>
      </Spinner>
      {active && (
        <Box className={classes.replyContainer}>
          <MessageReply name={name} message={message} color="#A36300" />
          <div className={classes.closeButtonContainer}>
            <IconButton className={classes.closeButton} onClick={() => dispatch(discardReply())}>
              <CloseIcon />
            </IconButton>
          </div>
        </Box>
      )}
    </>
  );
};

export default ChatContent;
