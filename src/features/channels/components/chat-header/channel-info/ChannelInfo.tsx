import { useAppSelector } from '@metis/store/hooks';
import { IChannel } from '@metis/features/channels/types/channel.interface';
import CloseIcon from '@mui/icons-material/Close';
import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { Fragment, useState } from 'react';
import useStyles from './ChannelInfo.styles';

type Props = {
  selectedChannel: IChannel;
};
const ChannelInfo = ({ selectedChannel }: Props) => {
  const classes = useStyles();
  const [isOpenWallet, setIsOpenWallet] = useState(false);
  const {
    selectedChannel: { members },
  } = useAppSelector((state) => state.channel);

  const closeDrawer = () => {
    setIsOpenWallet(false);
  };

  const openDrawer = () => {
    setIsOpenWallet(true);
  };

  return (
    <>
      <Drawer anchor="right" open={isOpenWallet} onClose={closeDrawer}>
        <Box role="presentation" className={classes.drawerContainer}>
          <Box className={classes.closeBox}>
            <span>Channel Info</span>
            <IconButton aria-label="close" onClick={closeDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box className={classes.avatarBox}>
            <Avatar
              alt={selectedChannel.channelName}
              src={selectedChannel.channelName}
              className={classes.avatar}
            />

            <Box>
              Channel {selectedChannel.channelName} · {members?.length} participants
            </Box>
          </Box>

          <Divider />
          <br />
          <br />
          <Box>
            Description
            <br />
            <br />
            <Box>
              Channel created by {selectedChannel.createdBy}, on{' '}
              {dayjs(selectedChannel.createdAt).format('MM/DD/YYYY')} at{' '}
              {dayjs(selectedChannel.createdAt).format('hh:mm A')}
            </Box>
          </Box>

          <Divider />
          <br />
          <br />
          <Box>
            Participants
            <List>
              {members &&
                members.map((account) => (
                  <Fragment key={account.memberAccountAddress}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar alt={account.memberAccountAddress} src={account.imageProfile} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={account.memberAccountAddress}
                          secondary={account.memberAccountAlias}
                          className={classes.member}
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </Fragment>
                ))}
            </List>
            <br />
            <br />
          </Box>
        </Box>
      </Drawer>

      <Typography variant="body1" onClick={() => openDrawer()} className={classes.title}>
        {selectedChannel.channelName}
      </Typography>
    </>
  );
};

export default ChannelInfo;
