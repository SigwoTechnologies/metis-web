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
import { useAcceptInvite, useGetUsersInvites } from '../../services/invite.service';
import InviteListItem from './InviteListItem/InviteListItem';

const InvitesList = () => {
  const { alias, address } = useAppSelector((state) => state.auth.jupAccount);
  const { invites, isLoadingInvites } = useAppSelector((state) => state.channel);
  const dispatch = useAppDispatch();

  const fetchInvites = () => {
    inviteService
      .getUsersInvites()
      .then((userInvites) => {
        const declinedChannels =
          JSON.parse(String(localStorage.getItem('DECLINED_CHANNELS'))) ?? [];

        const invitePending = userInvites.filter(
          ({ channelAddress }) => !declinedChannels.includes(channelAddress)
        );
        setInvites(invitePending);
      })
      .catch(() => {
        dispatch(
          openToast({ type: 'error', text: 'There was a problem when getting the pending invites' })
        );
      });
  };

  const acceptInvite = async (channelAddress: string) => {
    try {
      await useAcceptInvite(channelAddress);
      dispatch(openToast({ type: 'success', text: 'Invite accepted' }));
      // const updatedInvites = invites.filter((invite) => invite.channelAddress !== channelAddress);
      dispatch(useGetUsersInvites());
      dispatch(findChannels());
    } catch (error) {
      dispatch(openToast({ type: 'error', text: 'There was a problem accepting the invite' }));
    }
  };

  const DeclineInvite = async (channelAddress: string) => {
    try {
      const declinedChannels = JSON.parse(String(localStorage.getItem('DECLINED_CHANNELS'))) ?? [];
      declinedChannels.push(channelAddress);
      localStorage.setItem('DECLINED_CHANNELS', JSON.stringify(declinedChannels));

      dispatch(openToast({ type: 'success', text: 'Invite declined' }));
      const updatedInvites = invites.filter((invite) => invite.channelAddress !== channelAddress);
      setInvites(updatedInvites);
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

    socket.on('newInvite', () => {
      dispatch(useGetUsersInvites());
    });

    dispatch(useGetUsersInvites());
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
            {invites.length ? (
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
            ) : (
              ''
            )}
            {!invites.length && <InboxIcon />}
            <Typography>Invites</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <SpinnerContainer isLoading={isLoadingInvites}>
            {invites.map((invite) => (
              <InviteListItem
                key={invite.invitationId}
                acceptInvite={acceptInvite}
                DeclineInvite={DeclineInvite}
                invite={invite}
              />
            ))}
            {!invites.length && (
              <Typography variant="body2">There are no pending invites</Typography>
            )}
          </SpinnerContainer>
        </AccordionDetails>
      </Accordion>
    </List>
  );
};

export default InvitesList;
