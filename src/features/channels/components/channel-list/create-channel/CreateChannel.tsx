/* eslint-disable no-restricted-syntax */
import { yupResolver } from '@hookform/resolvers/yup';
import addChannelBtn from '@metis/assets/images/misc/add-channel-btn.svg';
import Form from '@metis/common/components/ui/Form/Form';
import TextInput from '@metis/common/components/ui/TextInput/TextInput';
import httpService from '@metis/common/services/http.service';
import createChannelIcon from '@metis/assets/images/misc/createChannelIcon.svg';
import {
  createChannel,
  setOpenCreateChannelDrawer,
} from '@metis/features/channels/store/channel.slice';
import { IChannel } from '@metis/features/channels/types/channel.interface';
import { IChannelDTO } from '@metis/features/channels/types/channel.dto';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Drawer } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import emojiRegex from 'emoji-regex';
import { useState } from 'react';
import * as yup from 'yup';
import useStyles from './CreateChannel.styles';

const schema = yup.object({
  channelName: yup
    .string()
    .required('This field is required')
    .max(25, 'The channel name can not have more than 25 characters'),
});

export const CreateChannel = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { isOpenCreateChannelDrawer } = useAppSelector((state) => state.channel);
  const [loading, setLoading] = useState(false);

  const closeDrawer = () => {
    dispatch(setOpenCreateChannelDrawer(false));
  };

  const openDrawer = () => {
    dispatch(setOpenCreateChannelDrawer(true));
  };
  const checkEmojiIndex = (channelName: string) => {
    const regex = emojiRegex();
    for (const { index } of channelName.matchAll(regex)) {
      if (!index) {
        throw dispatch(openToast({ text: 'Channel name cannot start with Emoji', type: 'error' }));
      }
    }
  };
  const createNewChannel = async (data: IChannelDTO) => {
    if (!data.channelName.trim()) {
      return;
    }
    try {
      checkEmojiIndex(data.channelName);
      setLoading(true);

      const { data: channelCreated } = await httpService.post('/v1/api/channel', data);

      dispatch(createChannel(channelCreated as IChannel));
      dispatch(openToast({ text: 'We are creating your channel', type: 'info' }));
      closeDrawer();
    } catch (error) {
      dispatch(openToast({ text: 'There was a problem creating your channel', type: 'error' }));
    }
    setLoading(false);
  };

  return (
    <>
      <Drawer anchor="left" open={isOpenCreateChannelDrawer} onClose={closeDrawer}>
        <Box role="presentation" className={classes.drawerContainer}>
          <Box
            className={classes.closeIconContainer}
            sx={{ width: '100%', justifyContent: 'flex-end' }}
          >
            <CloseIcon onClick={closeDrawer} className={classes.closeIcon} />
          </Box>

          <Box className={classes.avatarBox}>
            <Box component="img" src={createChannelIcon} alt="Create Channel Icon" />
            <p>Create New Channel</p>
          </Box>

          <Form<IChannelDTO> onSubmit={createNewChannel} form={{ resolver: yupResolver(schema) }}>
            <TextInput name="channelName" placeholder="Channel Name" />
            <LoadingButton
              loading={loading}
              type="submit"
              className={classes.button}
              variant="contained"
            >
              Create new channel
              <AddIcon />
            </LoadingButton>
          </Form>
        </Box>
      </Drawer>
      <Box
        onClick={() => openDrawer()}
        component="img"
        src={addChannelBtn}
        alt="Create Channel"
        className={classes.createButton}
      />
    </>
  );
};
