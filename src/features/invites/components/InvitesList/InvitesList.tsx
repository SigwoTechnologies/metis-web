import useOnMount from '@metis/common/hooks/useOnMount';
import { findChannels } from '@metis/features/channels/store/channel.actions';
import { useAppDispatch } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/Inbox';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import inviteService, { Invite } from '../../services/invite.service';
import InviteListItem from './InviteListItem/InviteListItem';

const InvitesList = () => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const dispatch = useAppDispatch();

  const acceptInvite = (channelAddress: string) => {
    inviteService
      .acceptInvite(channelAddress)
      .then(() => {
        dispatch(openToast({ type: 'success', text: 'Invite accepted' }));
        const updatedInvites = invites.filter((invite) => invite.channelAddress !== channelAddress);
        setInvites(updatedInvites);
        dispatch(findChannels(null));
      })
      .catch(() => dispatch(openToast({ type: 'error', text: 'Invite declined' })));
  };

  useOnMount(() => {
    inviteService
      .getUsersInvites()
      .then((data) => setInvites(data))
      .catch(() => {
        dispatch(
          openToast({ type: 'error', text: 'There was a problem when getting the pending invites' })
        );
      });
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
            <InboxIcon />
            <Typography>Invites</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {invites.map((invite) => (
            <InviteListItem
              acceptInvite={() => acceptInvite(invite.channelAddress)}
              key={invite.invitationId}
              invite={invite}
            />
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
