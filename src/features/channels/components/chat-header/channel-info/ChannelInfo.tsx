import appConfig from '@metis/common/configuration/app.config';
import { getToken } from '@metis/common/services/token.service';
import { Channel } from '@metis/features/channels/types/channel';
import { ChannelMember } from '@metis/features/channels/types/ChannelMember';
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
import axios from 'axios';
import dayjs from 'dayjs';
import { Fragment, useEffect, useState } from 'react';
import useStyles from './ChannelInfo.styles';

type Props = {
  selectedChannel: Channel;
};
const ChannelInfo = ({ selectedChannel }: Props) => {
  const classes = useStyles();
  const [isOpenWallet, setIsOpenWallet] = useState(false);
  const [members, setMembers] = useState<ChannelMember[]>([]);

  const getMembers = async () => {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    };
    const { data } = await axios.get(
      `${appConfig.api.baseUrl}/v1/api/${selectedChannel.channelAddress}/members`,
      {
        headers,
      }
    );

    setMembers(data);
  };

  useEffect(() => {
    if (selectedChannel.channelAddress) {
      getMembers();
    }
  }, [selectedChannel.channelAddress]);

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
              Channel {selectedChannel.channelName} · {members.length} participants
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
                members.map((e) => (
                  <Fragment key={e.memberAccountAddress}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar />
                        </ListItemAvatar>
                        <ListItemText
                          primary={e.memberAccountAddress}
                          secondary={
                            <div
                              style={{
                                width: '15rem',
                                marginBottom: '0.5rem',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                              }}
                            >
                              a{e.memberAccountAlias}
                            </div>
                          }
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
