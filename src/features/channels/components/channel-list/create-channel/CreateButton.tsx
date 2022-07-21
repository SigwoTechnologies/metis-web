import PlusButton from '@metis/assets/images/misc/plus-button.png';
import Box from '@mui/material/Box';

import { yupResolver } from '@hookform/resolvers/yup';
import Form from '@metis/common/components/ui/Form/Form';
import TextInput from '@metis/common/components/ui/TextInput/TextInput';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Drawer, IconButton } from '@mui/material';
import { useState } from 'react';
import * as yup from 'yup';
import useStyles from './CreateButton.styles';

type ChannelDTO = {
  channelName: string;
};

const schema = yup.object({
  channelName: yup
    .string()
    .required('This field is required')
    .max(25, 'The channel name can\'t have more than 25 characters'),
});

const CreateButton = () => {
  const classes = useStyles();
  const [openCreate, setOpenCreate] = useState(false);

  const closeDrawer = () => {
    setOpenCreate(false);
  };

  const createChannel = (data: ChannelDTO) => {
    // console.log(errors.channelName?.message);
    console.log(data);
  };

  return (
    <>
      <Drawer anchor="left" open={openCreate} onClose={closeDrawer}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            width: 400,
            height: '100%',
            flexDirection: 'column',
            padding: '0 1rem 0 1rem',
          }}
          role="presentation"
        >
          <IconButton
            aria-label="close"
            onClick={closeDrawer}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <Form<ChannelDTO> onSubmit={createChannel} form={{ resolver: yupResolver(schema) }}>
            <TextInput label="Channel name here" name="channelName" />
            <Button type="submit" className={classes.button} variant="contained">
              Create new channel
            </Button>
          </Form>
          {/* <form onSubmit={handleSubmit(createChannel)}>
            <TextField
              className={classes.textField}
              label="Channel name here"
              variant="standard"
              {...register('channelName')}
            />
            <p>{errors.channelName?.message}</p>
            <Button type="submit" className={classes.button} variant="contained">
              Create new channel
            </Button>
          </form> */}
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
