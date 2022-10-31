import { updateReply } from '@metis/features/channels/store/channel.slice';
import { IMessage as MessageType } from '@metis/features/channels/types/message.interface';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { memo, useState } from 'react';
import Attachment from '../attachment/Attachment';
import MessageReply from '../message-reply/MessageReply';
import useStyles from './Message.styles';

type Props = {
  message: MessageType;
  color: string;
  avatar?: string;
};

const Message = ({
  message: {
    senderAddress,
    senderAlias,
    message,
    createdAt,
    decryptedMessage,
    decryptedReplyMessage,
    replyRecipientAlias,
    attachmentObj,
  },
  color,
  avatar = senderAlias,
}: Props) => {
  const classes = useStyles();
  const [style, setStyle] = useState({ display: 'none' });
  const {
    jupAccount: { alias: currentUserAlias },
    imageAccount,
  } = useAppSelector((state) => state.auth);
  const isYours = senderAlias === currentUserAlias;
  const dispatch = useAppDispatch();

  const handleReplyClick = () => {
    dispatch(
      updateReply({
        replyRecipientAddress: senderAddress,
        replyRecipientAlias: senderAlias,
        replyMessage: message,
        decryptedReplyMessage: decryptedMessage,
      })
    );
  };

  const handleMouseEnter = () => setStyle({ display: 'block' });
  const handleMouseLeave = () => setStyle({ display: 'none' });

  return (
    <Box className={isYours ? classes.userContainer : classes.container}>
      <Box className={classes.avatarContainer}>
        <Avatar alt="pomp" src={imageAccount || avatar} className={classes.avatar} />
      </Box>

      <Box
        className={
          isYours
            ? `${classes.messageContainer} ${classes.userMessageContainer}`
            : classes.messageContainer
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Box className={classes.replyButton} style={style} onClick={handleReplyClick}>
          Reply
        </Box>
        <Typography variant="body2" fontWeight="bold" className={classes.userName} sx={{ color }}>
          {senderAlias}
        </Typography>
        {decryptedReplyMessage && replyRecipientAlias && (
          <MessageReply
            name={replyRecipientAlias}
            message={decryptedReplyMessage}
            color="#A36300"
          />
        )}
        <Box className={classes.message}>
          <Typography component="span" variant="body2">
            <Box>{decryptedMessage}</Box>
            {attachmentObj && <Attachment attachmentObj={attachmentObj} />}
          </Typography>
          <Typography
            component="span"
            variant="caption"
            className={classes.date}
            title={dayjs(createdAt).format('MM/DD/YYYY hh:mm:ssa')}
          >
            {dayjs(createdAt).format('hh:mm:ssa')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Message);
