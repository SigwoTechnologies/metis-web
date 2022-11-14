import appConfig from '@metis/common/configuration/app.config';
import { useAppSelector, useAppDispatch } from '@metis/store/hooks';
import connectSocket from '@metis/common/services/socket.service';
import { findMembers, findImageChannel } from '@metis/features/channels/store/channel.actions';
import { SpinnerContainer } from '@metis/common/components/ui/spinner-container/SpinnerContainer';
import { useUploadImage } from '@metis/features/channels/hooks/useUploadImage';
import PlaceholderAvatar from '@metis/assets/images/avatars/astronaut.png';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { IChannel } from '@metis/features/channels/types/channel.interface';
import { openToast } from '@metis/store/ui/ui.slice';
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
import Files from 'react-files';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { Fragment, useState, useEffect } from 'react';
import useStyles from './ChannelInfo.styles';

type Props = {
  selectedChannel: IChannel;
};

type TFile = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

const ChannelInfo = ({ selectedChannel }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [isOpenWallet, setIsOpenWallet] = useState(false);
  const [uploadingChannelImage, setUploadingChannelImage] = useState(false);
  const {
    selectedChannel: { members, channelAddress, imageChannel },
  } = useAppSelector((state) => state.channel);

  useEffect(() => {
    if (isOpenWallet) {
      dispatch(findMembers(channelAddress));
    }
    if (!imageChannel) {
      const url = `${appConfig.api.baseUrl}/jim/v1/api/users/${channelAddress}/files/public-profile`;
      dispatch(findImageChannel(url));
    }
  }, [isOpenWallet]);

  useEffect(() => {
    if (uploadingChannelImage) {
      const socket = connectSocket({
        query: {
          room: `upload-${channelAddress}`,
          user: channelAddress,
        },
      }).socket('/upload');

      socket.on('uploadCreated', async ({ url }: { url: string }) => {
        dispatch(findImageChannel(url));
        setUploadingChannelImage(false);
        socket.close();
      });

      socket.on('uploadFailed', async ({ errorMessage }: { errorMessage: string }) => {
        setUploadingChannelImage(false);
        dispatch(openToast({ text: errorMessage, type: 'error' }));
        socket.close();
      });
    }
  }, [uploadingChannelImage]);

  const closeDrawer = () => {
    setIsOpenWallet(false);
  };

  const openDrawer = () => {
    setIsOpenWallet(true);
  };

  const handleSelectFile = async ([file]: [TFile]) => {
    if (file) {
      setUploadingChannelImage(true);
      dispatch(openToast({ text: 'Uploading image, please wait', type: 'info' }));
      useUploadImage({ file, address: channelAddress, fileCategory: 'channel-profile' });
    }
  };

  const onFilesError = (error: Error) => {
    dispatch(
      openToast({
        text: `
        ${error.message}${error.message.includes(' is too large') ? ', maximum size 1.6MB' : ''}
        `,
        type: 'error',
      })
    );
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
            <SpinnerContainer isLoading={uploadingChannelImage}>
              <Files
                onChange={handleSelectFile}
                accepts={['image/*']}
                multiple
                maxFileSize={1600000}
                minFileSize={0}
                onError={onFilesError}
                clickable
              >
                <IconButton edge="start" size="medium" sx={{ p: 1.3 }}>
                  <Avatar
                    alt={selectedChannel.channelName}
                    src={selectedChannel.imageChannel || selectedChannel.channelName}
                    className={classes.avatar}
                  />
                  <AddAPhotoIcon className={classes.icon} />
                </IconButton>
              </Files>
            </SpinnerContainer>

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
                          <Avatar
                            alt={account.memberAccountAddress}
                            src={account.imageProfile || PlaceholderAvatar}
                          />
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
