import Modal from '@metis/common/components/ui/Modal';
import { useAppSelector } from '@metis/store/hooks';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import { LoadingButton } from '@mui/lab';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import useStyles from './UnlinkButton.styles';

export const UnlinkButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  const { isConnectingToMetamask, hasMetamask } = useAppSelector((state) => state.auth);

  const handleModalVisible = () => {
    setIsOpen(!isOpen);
  };

  const onUnlinkAccount = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <LoadingButton
        loading={isConnectingToMetamask}
        fullWidth
        disabled={!hasMetamask}
        variant="contained"
        onClick={handleModalVisible}
        style={{
          width: '5rem',
          position: 'absolute',
          top: '1rem',
          right: '1rem',
        }}
      >
        <span className={classes.span}>Unlink</span>
      </LoadingButton>

      <Modal open={isOpen}>
        <div className={classes.iconContainer}>
          <WarningIcon className={classes.icon} color="primary" />
          <span>Are you sure to unlink your account?</span>
        </div>

        <IconButton aria-label="close" onClick={handleModalVisible} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>

        <LoadingButton
          loading={isConnectingToMetamask}
          fullWidth
          disabled={!hasMetamask}
          variant="contained"
          onClick={onUnlinkAccount}
          style={{
            width: '20rem',
          }}
        >
          <span className={classes.span}>Unlink your account</span>
        </LoadingButton>
      </Modal>
    </>
  );
};
