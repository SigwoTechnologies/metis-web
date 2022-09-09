import useOnMount from '@metis/common/hooks/useOnMount';
import httpService from '@metis/common/services/http.service';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
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
  const { data } = await httpService.get<WebAppInfo[]>('/v1/api/version');
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const About = ({ title, message, onClick }: Props) => {
  const [info, setInfo] = useState<WebAppInfo[]>();
  const [open, setOpen] = useState(false);
  const styles = useStyles();

  useOnMount(() => {
    loadWebAppInfo().then((data) => {
      setInfo(data);
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
              {info &&
                info.map(({ name, version }) => (
                  <Grid>
                    <Grid className={styles.infoLine}>
                      <Grid className={styles.infoLineLeft}>{name}</Grid>
                      <Grid className={styles.infoLineRight}>{version}</Grid>
                    </Grid>
                    <Divider />
                  </Grid>
                ))}
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default About;
