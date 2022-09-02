import useOnMount from '@metis/common/hooks/useOnMount';
import httpService from '@metis/common/services/http.service';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import useStyles from './about.styles';

export interface WebAppInfo {
  name: string;
  version: string;
}

type Props = {
  title: string;
  message: string;
  onClick?: () => void;
};

const loadWebAppInfo = async (): Promise<WebAppInfo[]> => {
  const response = await httpService.get<WebAppInfo[]>('/v1/api/version');
  return response.data;
};

const About = ({ title, message, onClick }: Props) => {
  const [user, setUser] = useState<WebAppInfo[]>();
  const [open, setOpen] = useState(false);
  const styles = useStyles();
  const key = 0;

  useOnMount(() => {
    loadWebAppInfo().then((data) => {
      setUser(data);
    });
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography
        variant="caption"
        display="block"
        className={styles.term}
        onClick={handleClickOpen}
      >
        About
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid className={styles.infoBox}>
              <Divider />

              <Grid className={styles.infoLine}>
                <Grid className={styles.infoLineLeft}>{user && user[0].name}</Grid>
                <Grid className={styles.infoLineRight}>{user && user[0].version}</Grid>
              </Grid>
              <Divider />

              <Grid className={styles.infoLine}>
                <Grid className={styles.infoLineLeft}>{user && user[1].name}</Grid>
                <Grid className={styles.infoLineRight}>{user && user[1].version}</Grid>
              </Grid>
              <Divider />
              <Grid className={styles.infoLine}>
                <Grid className={styles.infoLineLeft}>{user && user[2].name}</Grid>
                <Grid className={styles.infoLineRight}>{user && user[2].version}</Grid>
              </Grid>
              <Divider />
              <Grid className={styles.infoLine}>
                <Grid className={styles.infoLineLeft}>{user && user[3].name}</Grid>
                <Grid className={styles.infoLineRight}>{user && user[3].version}</Grid>
              </Grid>
              <Divider />
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default About;
