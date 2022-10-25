import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import useStyles from './termConditions.styles';

type Props = {
  title: string;
  message: string;
};

const TermConditions = ({ title, message }: Props) => {
  const [open, setOpen] = React.useState(false);
  const styles = useStyles();

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
        Terms and Conditions
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default TermConditions;
