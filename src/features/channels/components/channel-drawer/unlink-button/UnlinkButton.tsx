import Modal from '@metis/common/components/ui/Modal';
import CloseIcon from '@mui/icons-material/Close';
import unlinkIcon from '@metis/assets/images/misc/unlink.svg';
import WarningIcon from '@mui/icons-material/Warning';
import { LoadingButton } from '@mui/lab';
import IconButton from '@mui/material/IconButton/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { useState } from 'react';
import useStyles from './UnlinkButton.styles';

export const UnlinkButton = () => {
  const styles = useStyles();
  const [isOpenUnlink, setIsOpenUnlink] = useState(false);

  const handleUnlink = () => {
    setIsOpenUnlink(!isOpenUnlink);
  };
  const onUnlinkAccount = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={handleUnlink} className={styles.listItemButton}>
          <ListItemIcon className={styles.unlink}>
            <Box
              component="img"
              src={unlinkIcon}
              alt="wallet icon"
              sx={{ height: '24px', width: '24px' }}
            />
          </ListItemIcon>
          <ListItemText className={styles.unlink} primary="Unlink Account" />
        </ListItemButton>
      </ListItem>

      <Modal open={isOpenUnlink}>
        <div className={styles.iconContainerUnlink}>
          <WarningIcon className={styles.icon} color="primary" />
          <span>Are you sure to unlink your account?</span>
          <span>This action is irreversible.</span>
          <span>You could lose your Metis account.</span>
        </div>
        <IconButton aria-label="close" onClick={handleUnlink} className={styles.closeButton}>
          <CloseIcon />
        </IconButton>
        <LoadingButton
          fullWidth
          variant="contained"
          onClick={onUnlinkAccount}
          style={{
            width: '20rem',
          }}
        >
          <span className={styles.span}>Unlink your account</span>
        </LoadingButton>
      </Modal>
    </>
  );
};
