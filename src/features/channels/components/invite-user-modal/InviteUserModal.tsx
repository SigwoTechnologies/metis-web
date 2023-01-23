import { findMembers } from '@metis/features/channels/store/channel.actions';
import { yupResolver } from '@hookform/resolvers/yup';
import appConfig from '@metis/common/configuration/app.config';
import Form from '@metis/common/components/ui/Form/Form';
import Dialog from '@mui/material/Dialog';
import TextInput from '@metis/common/components/ui/TextInput/TextInput';
import { ethers } from 'ethers';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openNotification } from '@metis/store/ui/ui.slice';
import createChannelIcon from '@metis/assets/images/misc/createChannelIcon.svg';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
      (member) =>
        member.memberAccountAddress === inviteAccount || member.memberAccountAlias === inviteAccount
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
        dispatch(findMembers(channelAddress));
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
    <Dialog onClose={closeModal} open={open}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '2% 4%',
          width: '500px',
          '@media (max-width: 768px)': { width: '300px' },
        }}
      >
        <Box className={classes.closeIconContainer}>
          <CloseIcon onClick={closeModal} className={classes.closeIcon} />
        </Box>
        <div className={classes.iconContainer}>
          <Box
            component="img"
            src={createChannelIcon}
            alt="Create Channel Icon"
            sx={{ height: '40px', width: '40px' }}
          />
        </div>
        <p style={{ textAlign: 'center' }}>
          To invite another user to this channel enter their ENS, Alias, or Account ID
        </p>
        <Form onSubmit={onSubmit} form={{ resolver: yupResolver(schema) }}>
          <TextInput name="inviteAccount" />
          <LoadingButton
            loading={loading}
            type="submit"
            className={classes.button}
            variant="contained"
            sx={{ fontWeight: '600' }}
          >
            Invite
            <GroupAddIcon sx={{ marginLeft: '5px', height: '18px', width: '18px' }} />
          </LoadingButton>
          <Button color="error" onClick={closeModal} className={classes.button}>
            Cancel
          </Button>
        </Form>
      </Box>
    </Dialog>
  );
};

export default InviteUserModal;
