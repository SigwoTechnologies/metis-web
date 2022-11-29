import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import hiddenChannelIcon from '@metis/assets/images/misc/hiddenChannelIcon.svg';
import { useMemo } from 'react';
import { selectState, unhideChannel } from '../../../store/channel.slice';
import { ChannelListItem } from '../channel-list-item/ChannelListItem';
import useStyles from './ModalHiddenList.styles';

type Props = {
  open: boolean;
  onClose: () => void;
};
const ModalHiddenList = ({ open, onClose }: Props) => {
  const styles = useStyles();

  const dispatch = useAppDispatch();
  const { channels, hiddenChannels } = useAppSelector(selectState);
  const hiddenChannelsAddreses = useMemo(
    () => hiddenChannels.map((channel) => channel.channelAddress),
    [hiddenChannels]
  );

  const showChannel = (channelAddress: string, channelName: string) => {
    dispatch(unhideChannel(channelAddress));
    dispatch(
      openToast({
        type: 'info',
        text: `${channelName} was successfully removed from Hidden Channels`,
      })
    );
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ padding: '4%', width: '500px', '@media(max-width:768px)': { width: '300px' } }}>
        <Box className={styles.closeIconContainer}>
          <CloseIcon onClick={onClose} className={styles.closeIcon} />
        </Box>
        <Typography
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '10px 0',
            fontSize: '1.4rem',
            borderBottom: '1px solid #61D90C',
          }}
        >
          Hidden Channels
          <Box
            component="img"
            src={hiddenChannelIcon}
            alt="hidden icon"
            sx={{ height: '24px', width: '24px', marginLeft: '5px' }}
          />
        </Typography>
        {!hiddenChannelsAddreses.length ? (
          <Typography className={styles.nothingMessage}>There are no hidden channels</Typography>
        ) : (
          <Box>
            {channels.map(
              (channel) =>
                hiddenChannelsAddreses.includes(channel.channelAddress) && (
                  <Box key={channel.channelName}>
                    <Box className={styles.cardContainer}>
                      <Box className={styles.cardContent}>
                        <ChannelListItem channel={channel} key={channel.channelAddress} />
                      </Box>
                      <CardActions
                        className={styles.actionContainer}
                        onClick={() => showChannel(channel.channelAddress, channel.channelName)}
                      >
                        <Typography className={styles.glow}>
                          <VisibilityIcon sx={{ position: 'relative', alignContent: 'center' }} />
                        </Typography>
                      </CardActions>
                    </Box>
                  </Box>
                )
            )}
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default ModalHiddenList;
