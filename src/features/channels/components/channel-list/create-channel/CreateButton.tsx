/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
import { yupResolver } from '@hookform/resolvers/yup';
import PlusButton from '@metis/assets/images/misc/plus-button.png';
import Form from '@metis/common/components/ui/Form/Form';
import TextInput from '@metis/common/components/ui/TextInput/TextInput';
import channelService from '@metis/features/channels/services/channel.service';
import { createChannel } from '@metis/features/channels/store/channel.slice';
import { Channel } from '@metis/features/channels/types/channel';
import { ChannelDTO } from '@metis/features/channels/types/channelDTO';
import { useAppDispatch } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Drawer, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import * as yup from 'yup';
import useStyles from './CreateButton.styles';

const schema = yup.object({
  channelName: yup
    .string()
    .required('This field is required')
    .max(25, "The channel name can't have more than 25 characters"),
});

const CreateButton = () => {
  const classes = useStyles();
  const [openCreate, setOpenCreate] = useState(false);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const closeDrawer = () => {
    setOpenCreate(false);
  };

  const createNewChannel = (data: ChannelDTO) => {
    if (!data.channelName.trim()) {
      return;
    }

    setLoading(true);
    channelService
      .create(data)
      .then((channel: Channel) => {
        dispatch(createChannel(channel));
        dispatch(openToast({ text: "We're creating your channel", type: 'info' }));
        closeDrawer();
      })
      .catch(() => {
        dispatch(openToast({ text: 'There was a problem creating your channel', type: 'error' }));
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Drawer anchor="left" open={openCreate} onClose={closeDrawer}>
        <Box role="presentation" className={classes.drawerContainer}>
          <IconButton aria-label="close" onClick={closeDrawer} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
          <Form<ChannelDTO> onSubmit={createNewChannel} form={{ resolver: yupResolver(schema) }}>
            <TextInput label="Channel name here" name="channelName" />
            <LoadingButton
              loading={loading}
              type="submit"
              className={classes.button}
              variant="contained"
            >
              Create new channel
            </LoadingButton>
          </Form>
        </Box>
      </Drawer>
      <Box
        onClick={() => setOpenCreate(true)}
        component="img"
        src={PlusButton}
        alt="Create Channel"
        className={classes.createButton}
      />
    </>
  );
};

export default CreateButton;
