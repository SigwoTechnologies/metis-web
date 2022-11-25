import { SpinnerContainer } from '@metis/common/components/ui/spinner-container/SpinnerContainer';
import useOnMount from '@metis/common/hooks/useOnMount';
import connect from '@metis/common/services/socket.service';
import { findChannels } from '@metis/features/channels/hooks/useGetChannels';
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
import { useAcceptInvite, useGetUsersInvites } from '../../services/invite.service';
import InviteListItem from './InviteListItem/InviteListItem';

const InvitesList = () => {
  const { alias, address } = useAppSelector((state) => state.auth.jupAccount);
  const { invites } = useAppSelector((state) => state.channel);
  const [proccessInvite, setProccessInvite] = useState(false);
  const dispatch = useAppDispatch();

  const acceptInvite = async (channelAddress: string) => {
    try {
      setProccessInvite(true);
      await useAcceptInvite(channelAddress);
      dispatch(openToast({ type: 'success', text: 'Invite accepted' }));
      dispatch(useGetUsersInvites());
      dispatch(findChannels());
    } catch (error) {
      dispatch(openToast({ type: 'error', text: 'There was a problem accepting the invite' }));
    }
    setProccessInvite(false);
  };

  useOnMount(() => {
    const socket = connect({
      query: {
        user: alias,
        room: address,
        event: 'newInvite',
      },
    }).socket('/invite');

    socket.on('newInvite', () => {
      dispatch(useGetUsersInvites());
    });

    dispatch(useGetUsersInvites());
  });

  return (
    <List
      sx={{
        padding: '0 !important',
      }}
    >
      <Accordion
        sx={{
          padding: '0 4%',
          borderRadius: '0 !important',
          borderLeft: '0px !important',
          borderRight: '0px !important',
          boxShadow: 'none !important',
          transition: 'none !important',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            padding: '1% 4% !important',
            border: '1px solid #61D90C',
            borderRadius: '10px',
            minHeight: '58px !important',
            maxHeight: '58px !important',
          }}
        >
          <Box display="flex" gap="1rem">
            {(invites.length && (
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
            )) ||
              ''}
            {!invites.length && <InboxIcon />}
            <Typography>Invites</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: '0 !important', margin: '10px 5px' }}>
          <SpinnerContainer isLoading={proccessInvite}>
            <SpinnerContainer isLoading={proccessInvite}>
              {invites.map((invite) => (
                <InviteListItem
                  key={invite.invitationId}
                  acceptInvite={acceptInvite}
                  proccessInvite={proccessInvite}
                  invite={invite}
                />
              ))}
              {!invites.length && (
                <Box sx={{ border: '1px solid #0DC7FA', borderRadius: '10px', padding: '3% 4%' }}>
                  <Typography variant="body2">You have no invites</Typography>
                </Box>
              )}
            </SpinnerContainer>
          </SpinnerContainer>
        </AccordionDetails>
      </Accordion>
    </List>
  );
};

export default InvitesList;
