import { updateReply } from '@metis/features/channels/store/channel.slice';
import { Message as MessageType } from '@metis/features/channels/types/Message';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { memo, useState } from 'react';

import useStyles from './Message.styles';

const formatDate = (dateNow: number) => {
  const date = new Date(dateNow);

  return date.toLocaleDateString('en-US');
};

type Props = {
  message: MessageType;
  color: string;
  avatar?: string;
  children: React.ReactElement | '';
};

const Message = ({
  message: { senderAddress, senderAlias, message, createdAt, decryptedMessage },
  color,
  children,
  avatar = senderAlias,
}: Props) => {
  const classes = useStyles();
  const [style, setStyle] = useState({ display: 'none' });
  const { alias: currentUserAlias } = useAppSelector((state) => state.auth.jupAccount);
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
        <Avatar alt="pomp" src={avatar} className={classes.avatar} />
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
        <Typography variant="body2" fontWeight="bold" sx={{ color, marginBottom: '0.5rem' }}>
          {senderAlias}
        </Typography>
        {children}
        <Box className={classes.message}>
          <Typography variant="body2">{decryptedMessage}</Typography>
          <Typography variant="caption" className={classes.date}>
            {formatDate(createdAt)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Message);
