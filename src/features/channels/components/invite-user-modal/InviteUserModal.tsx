import { findMembers } from '@metis/features/channels/store/channel.actions';
import { yupResolver } from '@hookform/resolvers/yup';
import appConfig from '@metis/common/configuration/app.config';
import Form from '@metis/common/components/ui/Form/Form';
import Modal from '@metis/common/components/ui/Modal';
import TextInput from '@metis/common/components/ui/TextInput/TextInput';
import { ethers } from 'ethers';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openNotification } from '@metis/store/ui/ui.slice';
import PeopleIcon from '@mui/icons-material/People';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { useSendInvitation } from '../../hooks/useSendInvitation';
import useStyles from './InviteUserModal.styles';

type Props = {
  closeModal: () => void;
  open: boolean;
};

type AliasOrId = {
  inviteAccount: string;
};

const schema = yup.object({
  inviteAccount: yup.string().required('This field is required'),
});

const InviteUserModal: React.FC<Props> = ({ closeModal, open }) => {
  const classes = useStyles();
  const {
    selectedChannel: { channelAddress, members },
  } = useAppSelector((state) => state.channel);
  const {
    jupAccount: { address, alias },
  } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const provider = new ethers.providers.JsonRpcProvider(appConfig.providerENS.url);

  useEffect(() => {
    if (open) {
      dispatch(findMembers(channelAddress));
    }
  }, [open]);

  const onSubmit = async ({ inviteAccount }: AliasOrId) => {
    if ([alias, address].includes(inviteAccount)) {
      dispatch(
        openNotification({
          text: 'You cant invite yourself',
          type: 'error',
        })
      );
      return;
    }
    const existMember = members.find(
      (e) => e.memberAccountAddress === inviteAccount || e.memberAccountAlias === inviteAccount
    );

    if (existMember) {
      dispatch(
        openNotification({
          text: 'This account is already on the channel',
          type: 'error',
        })
      );
      return;
    }

    const inviteeAddressOrAlias = await provider
      .getResolver(inviteAccount)
      .then((resolvedName) => resolvedName?.address ?? inviteAccount);

    if (!inviteeAddressOrAlias) return;

    setLoading(true);
    useSendInvitation({ inviteeAddressOrAlias, channelAddress })
      .then(() => {
        dispatch(openNotification({ text: 'Invite sent!', type: 'success' }));
        closeModal();
      })
      .catch(() => {
        dispatch(
          openNotification({
            text: `
            Something went wrong
            ${inviteeAddressOrAlias.includes('.eth') ? 'with your ENS' : ''}
            ${inviteeAddressOrAlias.includes('0x') ? 'with your ETH Address' : ''}
            ${inviteeAddressOrAlias.includes('JUP') ? 'with your Jupiter Address' : ' '}
            `,
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
      <p>To invite another user to this channel enter their ENS, Alias, or Account ID</p>
      <Form onSubmit={onSubmit} form={{ resolver: yupResolver(schema) }}>
        <TextInput name="inviteAccount" label="Enter ENS, alias or Account ID here" />
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
