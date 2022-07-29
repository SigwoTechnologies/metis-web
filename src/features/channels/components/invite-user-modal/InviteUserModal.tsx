import Modal from '@metis/common/components/ui/Modal';
import Notification from '@metis/common/components/ui/Notification';
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useStyles from './InviteUserModal.styles';

type Props = {
  closeModal: () => void;
  open: boolean;
};

const InviteUserModal: React.FC<Props> = ({ closeModal, open }) => {
  const classes = useStyles();
  const [notification, setNotification] = useState(false);

  const openNotification = (): void => {
    closeModal();
    setNotification(true);
  };

  return (
    <>
      <Notification type="success" isOpen={notification} onClose={() => setNotification(false)} />

      <Modal onClose={closeModal} open={open}>
        <p>
          To invite another user to join this channel enter their Alias or Account ID and click
          &quot;invite&quot;
        </p>
        <TextField
          className={classes.textField}
          label="Enter or Account ID here"
          variant="standard"
        />
        <Button onClick={openNotification} className={classes.button} variant="contained">
          Invite
        </Button>
        <Button color="error" onClick={closeModal} className={classes.button}>
          Cancel
        </Button>
      </Modal>
    </>
  );
};

export default InviteUserModal;
