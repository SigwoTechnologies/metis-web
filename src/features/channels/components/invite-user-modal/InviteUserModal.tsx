import Form from '@metis/common/components/ui/Form/Form';
import Modal from '@metis/common/components/ui/Modal';
import Notification from '@metis/common/components/ui/Notification';
import TextInput from '@metis/common/components/ui/TextInput/TextInput';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import channelService from '../../services/channel.service';
import { selectState } from '../../store/channel.slice';
import useStyles from './InviteUserModal.styles';

type Props = {
  closeModal: () => void;
  open: boolean;
};

type AliasOrId = {
  inviteeAddressOrAlias: string;
};

const InviteUserModal: React.FC<Props> = ({ closeModal, open }) => {
  const classes = useStyles();
  const [notification, setNotification] = useState(false);
  const {
    selectedChannel: { channelAddress },
  } = useAppSelector(selectState);
  const dispatch = useAppDispatch();

  const openNotification = (): void => {
    closeModal();
    setNotification(true);
  };

  const onSubmit = ({ inviteeAddressOrAlias }: AliasOrId) => {
    channelService
      .inviteToChannel({ inviteeAddressOrAlias, channelAddress })
      .then(() => openNotification())
      .catch((error) => {
        const { message } = error.response.data;
        dispatch(
          openToast({ text: message || 'Something went wrong, please try again.', type: 'error' })
        );
      });
  };

  return (
    <>
      <Notification
        message="Invite sent!"
        type="success"
        isOpen={notification}
        onClose={() => setNotification(false)}
      />

      <Modal onClose={closeModal} open={open}>
        <p>
          To invite another user to join this channel enter their Alias or Account ID and click
          &quot;invite&quot;
        </p>
        <Form onSubmit={onSubmit}>
          <TextInput name="inviteeAddressOrAlias" label="Enter alias or Account ID here" />
          <Button type="submit" className={classes.button} variant="contained">
            Invite
          </Button>
          <Button color="error" onClick={closeModal} className={classes.button}>
            Cancel
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default InviteUserModal;
