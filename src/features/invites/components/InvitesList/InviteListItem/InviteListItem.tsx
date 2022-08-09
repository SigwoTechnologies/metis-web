import { Invite } from '@metis/features/invites/services/invite.service';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import FolderIcon from '@mui/icons-material/Folder';
import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

type Props = {
  invite: Invite;
  acceptInvite: () => void;
  loading: boolean;
};

const InviteListItem = ({ invite, acceptInvite, loading }: Props) => (
  <ListItem
    secondaryAction={
      <>
        {!loading && (
          <Box display="flex" gap="0.3rem">
            <IconButton onClick={acceptInvite} color="success">
              <DoneIcon />
            </IconButton>
            <IconButton color="error">
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
        <Avatar>
          <FolderIcon />
        </Avatar>
      </Badge>
    </ListItemAvatar>
    <ListItemText primary={invite.channelName} secondary={invite.channelAddress} />
  </ListItem>
);

export default InviteListItem;
