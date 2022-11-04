import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import { LoadingButton } from '@mui/lab';
import Modal from '@metis/common/components/ui/Modal';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import constants from '@metis/common/configuration/constants';
import { Grid } from '@mui/material';
import useStyles from './ShowPassphrase.styles';

const ShowPassphrase = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(true);
  const {
    userData: { passphrase, password },
  } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const display = localStorage.getItem(constants.RECOVERY_CREDS);
    if (!display || display === 'false') setShow(false);
  }, []);

  const onDisplayed = () => {
    localStorage.setItem(constants.RECOVERY_CREDS, 'true');
    setShow(true);
  };

  const copyToClipboard = (text: string, textCopy: string) => {
    navigator.clipboard.writeText(textCopy);
    dispatch(openToast({ text: `${text} copied to clipboard`, type: 'success' }));
  };

  return (
    <Modal open={!show}>
      <div className={classes.container}>
        <VpnKeyIcon className={classes.iconHeader} color="primary" />

        <span className={classes.text}>
          Save your Passphrase and Password securely. It will be needed in case you lose access to
          your account.
        </span>
        <span className={classes.text}>
          Warning: do not reveal your backup phrase. Anyone who gets this data, can log into your
          account.
        </span>

        <br />

        <Grid>
          <Grid className={classes.subtitle}>Passphrase: </Grid>
          <Grid>
            <button
              type="button"
              onClick={() => copyToClipboard('Passphrase', passphrase)}
              className={classes.buttonID}
            >
              <Grid className={classes.buttonLayout}>
                <Grid className={classes.buttonLeft}>
                  <ContentCopyIcon className={classes.icon} />
                </Grid>
                <Grid className={classes.buttonRight}> &nbsp; {passphrase}</Grid>
              </Grid>
            </button>
          </Grid>
        </Grid>

        <br />

        <Grid>
          <Grid className={classes.subtitle}>Password: </Grid>
          <Grid>
            <button
              type="button"
              onClick={() => copyToClipboard('Password', password)}
              className={classes.buttonID}
            >
              <Grid className={classes.buttonLayout}>
                <Grid className={classes.buttonLeft}>
                  <ContentCopyIcon className={classes.icon} />
                </Grid>
                <Grid className={classes.buttonRight}> &nbsp; {password}</Grid>
              </Grid>
            </button>
          </Grid>
        </Grid>
      </div>

      <br />
      <br />

      <LoadingButton fullWidth variant="contained" onClick={onDisplayed}>
        <span className={classes.span}>Seen and close</span>
      </LoadingButton>
    </Modal>
  );
};

export default ShowPassphrase;
