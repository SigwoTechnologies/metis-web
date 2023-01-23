import Modal from '@metis/common/components/ui/Modal';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import useStyles from '../SyncAccount.styles';

type props = {
  credentials: boolean;
  modalSynchronized: boolean;
  setModalSynchronized: (value: boolean) => void;
};

export const AccountSynchronized = ({
  credentials,
  modalSynchronized,
  setModalSynchronized,
}: props) => {
  const classes = useStyles();
  return (
    <Modal open={modalSynchronized}>
      <Box style={{ textAlign: 'center' }}>
        <span>The account has been successfully synchronized.</span>
        <br />
        <br />
        {!credentials && (
          <LoadingButton fullWidth variant="contained" onClick={() => window.location.reload()}>
            <span className={classes.span}>Ok</span>
          </LoadingButton>
        )}
        {credentials && (
          <LoadingButton fullWidth variant="contained" onClick={() => setModalSynchronized(false)}>
            <span className={classes.span}>Ok</span>
          </LoadingButton>
        )}
      </Box>
    </Modal>
  );
};
