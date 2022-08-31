import useOnMount from '@metis/common/hooks/useOnMount';
import connect from '@metis/common/services/socket.service';
import { findChannels } from '@metis/features/channels/store/channel.actions';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/Inbox';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  List,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import inviteService, { Invite } from '../../services/invite.service';
import InviteListItem from './InviteListItem/InviteListItem';

const InvitesList = () => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const { alias, address } = useAppSelector((state) => state.auth.jupAccount);
  const dispatch = useAppDispatch();

  const fetchInvites = () => {
    inviteService
      .getUsersInvites()
      .then(setInvites)
      .catch(() => {
        dispatch(
          openToast({ type: 'error', text: 'There was a problem when getting the pending invites' })
        );
      });
  };

  const acceptInvite = async (channelAddress: string) => {
    try {
      await inviteService.acceptInvite(channelAddress);
      dispatch(openToast({ type: 'success', text: 'Invite accepted' }));
      const updatedInvites = invites.filter((invite) => invite.channelAddress !== channelAddress);
      setInvites(updatedInvites);
      dispatch(findChannels(null));
    } catch (error) {
      dispatch(openToast({ type: 'error', text: 'There was a problem accepting the invite' }));
    }
  };

  useOnMount(() => {
    const socket = connect({
      query: {
        user: alias,
        room: address,
        event: 'newInvite',
      },
    }).socket('/invite');

    socket.on('newInvite', fetchInvites);

    fetchInvites();
  });

  return (
    <List>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box display="flex" gap="1rem">
            {invites.length > 0 && (
              <Badge
                color="error"
                badgeContent={invites.length}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <InboxIcon />
              </Badge>
            )}
            {invites.length === 0 && <InboxIcon />}
            <Typography>Invites</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {invites.map((invite) => (
            <InviteListItem key={invite.invitationId} acceptInvite={acceptInvite} invite={invite} />
          ))}
          {invites.length === 0 && (
            <Typography variant="body2">There are no pending invites</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </List>
  );
};

export default InvitesList;
