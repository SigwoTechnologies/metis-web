/* eslint-disable quotes */
import PlusButton from '@metis/assets/images/misc/plus-button.png';
import Box from '@mui/material/Box';

import { yupResolver } from '@hookform/resolvers/yup';
import Form from '@metis/common/components/ui/Form/Form';
import TextInput from '@metis/common/components/ui/TextInput/TextInput';
import { createChannel } from '@metis/features/channels/store/channel.actions';
import { ChannelDTO } from '@metis/features/channels/types/channelDTO';
import { useAppDispatch } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Drawer, IconButton } from '@mui/material';
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

  const closeDrawer = () => {
    setOpenCreate(false);
  };

  const createNewChannel = (data: ChannelDTO) => {
    dispatch(createChannel(data));
    dispatch(openToast({ text: 'Channel created sucessfully', type: 'success' }));
    closeDrawer();
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
            <Button type="submit" className={classes.button} variant="contained">
              Create new channel
            </Button>
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
