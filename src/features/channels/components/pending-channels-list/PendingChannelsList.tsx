import connect from '@metis/common/services/socket.service';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import {
  Avatar,
  Box,
  CircularProgress,
  ListItemAvatar,
  ListItemButton,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { finishChannelCreation } from '../../store/channel.slice';
import useStyles from './PendingChannelsList.styles';

type SuccessfulChannelCreation = {
  jobId: number;
  channelName: string;
  channelAddress: string;
};

type FailedChannelCreation = { jobId: number; channelAddress: string };

const PendingChannelsList = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const {
    channel: { pendingChannels },
    auth: { jupAccount },
  } = useAppSelector((state) => state);

  useEffect(() => {
    if (jupAccount.address && jupAccount.alias) {
      const socket = connect({
        query: {
          room: jupAccount.address, // address of the current user
          user: jupAccount.alias, // alias of the current user
        },
      }).socket('/channels');

      socket.on('channelSuccessful', ({ channelName, jobId }: SuccessfulChannelCreation) => {
        dispatch(finishChannelCreation(jobId));
        dispatch(
          openToast({ type: 'success', text: `Channel '${channelName}' was created succesfully` })
        );
      });

      socket.on('channelCreationFailed', (channelFailedData: FailedChannelCreation) => {
        const jobId =
          typeof channelFailedData === 'number' ? channelFailedData : channelFailedData.jobId;
        dispatch(finishChannelCreation(jobId));
        dispatch(openToast({ type: 'error', text: 'The channel could not be created' }));
      });

      return () => {
        socket.off('channelSuccessful');
        socket.off('channelCreationFailed');
      };
    }

    return undefined;
  }, []);

  return (
    <>
      {pendingChannels.map((channel) => (
        <Box key={channel.job.id} display="flex" alignItems="center">
          <ListItemButton className={classes.listItemButton} disabled alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={channel.channelName} className={classes.avatar} />
            </ListItemAvatar>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Box className={classes.channelName}>
                <Typography component="span" variant="caption" color="text.primary">
                  {channel.channelName}
                </Typography>
                <Box display="flex">
                  <Typography noWrap component="span" variant="caption" color="text.secondary">
                    <i>We&apos;re creating your new channel!</i>
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Box className={classes.channelDescription}>
                  <Box display="flex">
                    <CircularProgress size="1rem" />
                  </Box>
                </Box>
              </Box>
            </Box>
          </ListItemButton>
        </Box>
      ))}
    </>
  );
};

export default PendingChannelsList;
