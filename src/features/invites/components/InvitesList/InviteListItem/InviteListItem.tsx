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
  DeclineInvite: (channelAddress: string) => Promise<void>;
};

const InviteListItem = ({ invite, acceptInvite, DeclineInvite }: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleAcceptInvite = () => {
    acceptInvite(invite.channelAddress);
  };

  const declineInvite = () => {
    useDeclineInvites(invite.invitationId);
    dispatch(useGetUsersInvites());
  };

  const handleDeclineInvite = () => {
    setLoading(true);
    DeclineInvite(invite.channelAddress).finally(() => setLoading(false));
  };

  return (
    <ListItem
      secondaryAction={
        <>
          {!loading && (
            <Box display="flex" gap="0.3rem">
              <IconButton onClick={handleAcceptInvite} color="success">
                <DoneIcon />
              </IconButton>
              <IconButton onClick={handleDeclineInvite} color="error">
                <CloseIcon />
              </IconButton>
            </Box>
          )}
          {loading && <CircularProgress size="1em" />}
        </>
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
