import httpService from '@metis/common/services/http.service';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import useStyles from './about.styles';

type Props = {
  title: string;
  message: string;
  onClick?: () => void;
};

const About = ({ title, message, onClick }: Props) => {
  const [open, setOpen] = React.useState(false);
  const styles = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(httpService.get('/v1/api/version').toString());
  };
  const listOfInfo = {};

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
            <Box sx={{ width: '25rem' }}>
              <Box>Metis Version</Box>

              <Box>
                <Divider />
                Metis Server
              </Box>

              <Box>
                <Divider />
                Jupiter Network
              </Box>

              <Box>
                <Divider />
                Jupiter Server
              </Box>

              <Box>
                <Divider />
                Display
              </Box>
              <Divider />
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default About;
