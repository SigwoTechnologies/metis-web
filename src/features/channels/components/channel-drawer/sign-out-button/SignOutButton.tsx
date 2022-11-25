import { signOut } from '@metis/features/auth/store/auth.slice';
import { useAppDispatch } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import logoutIcon from '@metis/assets/images/misc/logoutIcon.svg';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import useStyles from './SignOutButton.styles';

export const SignOutButton = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    dispatch(openToast({ text: 'Sign out successful', type: 'info' }));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleSignOut} className={styles.listItemButton}>
        <ListItemIcon className={styles.logout}>
          <Box
            component="img"
            src={logoutIcon}
            alt="wallet icon"
            sx={{ height: '24px', width: '24px' }}
          />
        </ListItemIcon>
        <ListItemText className={styles.logout} primary="Log out" />
      </ListItemButton>
    </ListItem>
  );
};
