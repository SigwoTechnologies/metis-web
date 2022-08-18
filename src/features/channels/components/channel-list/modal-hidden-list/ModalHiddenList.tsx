import Modal from '@metis/common/components/ui/Modal';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import * as React from 'react';
import { useMemo } from 'react';
import { selectState, unhideChannel } from '../../../store/channel.slice';
import ChannelListItem from '../channel-list-item/ChannelListItem';
import useStyles from './ModalHiddenList.styles';

const ModalHiddenList = () => {
  const styles = useStyles();
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const { channels, hiddenChannels } = useAppSelector(selectState);
  const hiddenChannelsAddreses = useMemo(
    () => hiddenChannels.map((channel) => channel.channelAddress),
    [hiddenChannels]
  );
  const closeModal = () => {
    setOpen(false);
  };
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
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpen(true)}>
          <ListItemIcon style={{ color: 'purple' }}>
            <IndeterminateCheckBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Hidden Channels" />
        </ListItemButton>
      </ListItem>
      <Modal open={open} onClose={closeModal} title="Hidden Channels">
        {hiddenChannelsAddreses.length === 0 ? (
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
                        <ChannelListItem
                          channel={channel}
                          key={channel.channelAddress}
                          name={channel.channelName}
                          date=""
                          message=""
                          onClick={() => showChannel(channel.channelAddress, channel.channelName)}
                        />
                      </CardContent>
                      <CardActions
                        className={styles.actionContainer}
                        onClick={() => showChannel(channel.channelAddress, channel.channelName)}
                      >
                        <VisibilityIcon />
                      </CardActions>
                    </Box>
                  </Box>
                )
            )}
          </Card>
        )}
      </Modal>
    </>
  );
};

export default ModalHiddenList;