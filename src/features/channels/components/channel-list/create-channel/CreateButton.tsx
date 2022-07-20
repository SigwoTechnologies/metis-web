import PlusButton from '@metis/assets/images/misc/plus-button.png';
import Box from '@mui/material/Box';

import CloseIcon from '@mui/icons-material/Close';
import { Button, Drawer, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import useStyles from './CreateButton.styles';

const CreateButton = () => {
  const classes = useStyles();
  const [openCreate, setOpenCreate] = useState(false);

  const closeDrawer = () => {
    setOpenCreate(false);
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
          <TextField className={classes.textField} label="Channel name here" variant="standard" />
          <Button className={classes.button} variant="contained">
            Invite
          </Button>
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
