import Modal from '@metis/common/components/ui/Modal';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import { useMemo } from 'react';
import { selectState, unhideChannel } from '../../../store/channel.slice';
import ChannelListItem from '../channel-list-item/ChannelListItem';
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
    <Modal open={open} onClose={onClose} title="Hidden Channels">
      {!hiddenChannelsAddreses.length ? (
        <Typography className={styles.nothingMessage}>There are no hidden channels</Typography>
      ) : (
        <Card sx={{ minWidth: 400 }}>
          {channels.map(
            (channel) =>
              hiddenChannelsAddreses.includes(channel.channelAddress) && (
                <Box key={channel.channelName}>
                  <Divider />
                  <Box className={styles.cardContainer}>
                    <CardContent className={styles.cardContent}>
                      <ChannelListItem channel={channel} key={channel.channelAddress} />
                    </CardContent>
                    <CardActions
                      className={styles.actionContainer}
                      onClick={() => showChannel(channel.channelAddress, channel.channelName)}
                    >
                      <Typography className={styles.glow}>
                        <VisibilityIcon />
                      </Typography>
                    </CardActions>
                  </Box>
                </Box>
              )
          )}
        </Card>
      )}
    </Modal>
  );
};

export default ModalHiddenList;
