import { useDeclineInvites } from '@metis/features/channels/hooks/useDeclineInvites';
import { TInvite, useGetUsersInvites } from '@metis/features/invites/services/invite.service';
import { useAppDispatch } from '@metis/store/hooks';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

type Props = {
  invite: TInvite;
  acceptInvite: (channelAddress: string) => Promise<void>;
};

const InviteListItem = ({ invite, acceptInvite }: Props) => {
  const dispatch = useAppDispatch();

  const handleAcceptInvite = () => {
    acceptInvite(invite.channelAddress);
  };

  const declineInvite = () => {
    useDeclineInvites(invite.invitationId);
    dispatch(useGetUsersInvites());
  };

  return (
    <ListItem
      secondaryAction={
        <Box display="flex" gap="0.3rem">
          <IconButton onClick={handleAcceptInvite} color="success">
            <DoneIcon />
          </IconButton>
          <IconButton onClick={declineInvite} color="error">
            <CloseIcon />
          </IconButton>
        </Box>
      }
    >
      <ListItemAvatar>
        <Badge
          color="secondary"
          variant="dot"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Avatar alt={invite.channelName} src={invite.channelName} />
        </Badge>
      </ListItemAvatar>
      <ListItemText primary={invite.channelName} secondary={invite.channelAddress} />
    </ListItem>
  );
};

export default InviteListItem;
