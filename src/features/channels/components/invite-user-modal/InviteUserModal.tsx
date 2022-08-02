import { yupResolver } from '@hookform/resolvers/yup';
import Form from '@metis/common/components/ui/Form/Form';
import Modal from '@metis/common/components/ui/Modal';
import TextInput from '@metis/common/components/ui/TextInput/TextInput';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openNotification } from '@metis/store/ui/ui.slice';
import PeopleIcon from '@mui/icons-material/People';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import * as yup from 'yup';
import channelService from '../../services/channel.service';
import useStyles from './InviteUserModal.styles';

type Props = {
  closeModal: () => void;
  open: boolean;
};

type AliasOrId = {
  inviteeAddressOrAlias: string;
};

const schema = yup.object({
  inviteeAddressOrAlias: yup.string().required('This field is required'),
});

const InviteUserModal: React.FC<Props> = ({ closeModal, open }) => {
  const classes = useStyles();
  const {
    selectedChannel: { channelAddress },
  } = useAppSelector((state) => state.channel);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = ({ inviteeAddressOrAlias }: AliasOrId) => {
    setLoading(true);
    channelService
      .inviteToSelectedChannel({ inviteeAddressOrAlias, channelAddress })
      .then(() => dispatch(openNotification({ text: 'Invite sent!', type: 'success' })))
      .catch((error) => {
        const { message } = error.response.data;
        dispatch(
          openNotification({
            text: message || 'Something went wrong, please try again.',
            type: 'error',
          })
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal onClose={closeModal} open={open}>
      <div className={classes.iconContainer}>
        <PeopleIcon className={classes.icon} color="primary" />
      </div>
      <p>
        To invite another user to join this channel enter their Alias or Account ID and click
        &quot;invite&quot;
      </p>
      <Form onSubmit={onSubmit} form={{ resolver: yupResolver(schema) }}>
        <TextInput name="inviteeAddressOrAlias" label="Enter alias or Account ID here" />
        <LoadingButton
          loading={loading}
          type="submit"
          className={classes.button}
          variant="contained"
        >
          Invite
        </LoadingButton>
        <Button color="error" onClick={closeModal} className={classes.button}>
          Cancel
        </Button>
      </Form>
    </Modal>
  );
};

export default InviteUserModal;
