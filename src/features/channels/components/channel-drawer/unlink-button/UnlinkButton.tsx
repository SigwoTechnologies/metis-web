import CloseIcon from '@mui/icons-material/Close';
import unlinkIcon from '@metis/assets/images/misc/unlinkIcon.svg';
import unlinkIconBlack from '@metis/assets/images/misc/unlinkIconBlack.svg';
import alertIcon from '@metis/assets/images/misc/alertIcon.svg';
import { Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
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
              alt="unlink icon"
              sx={{ height: '24px', width: '24px' }}
            />
          </ListItemIcon>
          <ListItemText className={styles.unlink} primary="Unlink Account" />
        </ListItemButton>
      </ListItem>

      <Dialog open={isOpenUnlink}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '4%',
            alignItems: 'center',
            justifyContent: 'center',
            width: '500px',
            '@media (max-width:768px)': { width: '300px' },
          }}
        >
          <Box
            className={styles.closeIconContainer}
            sx={{ width: '100%', justifyContent: 'flex-end' }}
          >
            <CloseIcon onClick={handleUnlink} className={styles.closeIcon} />
          </Box>
          <div className={styles.iconContainerUnlink}>
            <Box component="img" src={alertIcon} alt="alert icon" sx={{ paddingBottom: '20px' }} />
            <Typography sx={{ textAlign: 'center', padding: '0 4%' }}>
              Are you sure you want to <span style={{ color: '#F0EA02' }}>unlink</span> your
              account? <br /> You could lose your <span style={{ color: '#61D90C ' }}>Metis</span>{' '}
              account. <br />
              <span style={{ fontSize: '0.8rem', color: '#D95323' }}>
                This action is irreversible.
              </span>
            </Typography>
          </div>
          <LoadingButton
            fullWidth
            variant="contained"
            onClick={onUnlinkAccount}
            style={{
              width: '20rem',
              fontSize: '1.4rem',
              height: '40px',
            }}
          >
            <span className={styles.span}>
              Unlink your account{' '}
              <Box
                component="img"
                src={unlinkIconBlack}
                alt="unlink icon"
                sx={{ height: '18px', width: '18px', marginLeft: '5px' }}
              />
            </span>
          </LoadingButton>
        </Box>
      </Dialog>
    </>
  );
};
