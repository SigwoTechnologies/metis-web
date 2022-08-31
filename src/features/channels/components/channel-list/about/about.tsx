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

export interface WebAppInfo {
  infoOne: string;
  infoTwo: string;
  infoThree: string;
  infoFour: string;
  infoFive: string;
}
export interface InfoResponse {
  webAppInfo: WebAppInfo;
  tag: string;
  transactionId: string;
}

type Props = {
  title: string;
  message: string;
  onClick?: () => void;
};

const loadWebAppInfo = async (): Promise<WebAppInfo[]> => {
  const response = await httpService.get<InfoResponse[]>('/v1/api/version');
  const filteredData = response.data.map((item) => item.webAppInfo);
  return filteredData;
};

Promise.all([loadWebAppInfo]).then((values) => {
  console.log(values);
});

const About = ({ title, message, onClick }: Props) => {
  const [open, setOpen] = React.useState(false);
  const styles = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const listOfInfo = async () => {
    const try1 = await httpService.get('/v1/api/version');
    return try1.data.toString();
  };

  console.log(listOfInfo());

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
                <div>{}</div>
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
