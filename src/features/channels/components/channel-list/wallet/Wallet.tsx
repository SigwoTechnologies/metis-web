import { fetchBalance } from '@metis/features/wallet/store/wallet.actions';
import { setIsOpenWallet } from '@metis/features/wallet/store/wallet.slice';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import CloseIcon from '@mui/icons-material/Close';
import {
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Box from '@mui/material/Box';
import walletIcon from '@metis/assets/images/misc/walletIcon.svg';
import { useEffect } from 'react';
import ReceiveJup from './receive-jup/receive-jup';
import SendJup from './send-jup/send-jup';
import Transactions from './transactions/Transactions';
import useStyles from './Wallet.styles';

const Wallet = () => {
  const classes = useStyles();
  const { balance, isOpenWallet } = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBalance());
  }, []);

  const closeDrawer = () => {
    dispatch(setIsOpenWallet(false));
  };

  const openDrawer = () => {
    dispatch(setIsOpenWallet(true));
  };

  return (
    <>
      <Drawer anchor="left" open={isOpenWallet} onClose={closeDrawer}>
        <Box role="presentation" className={classes.drawerContainer}>
          <IconButton aria-label="close" onClick={closeDrawer} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>

          <Box>
            <span style={{ color: 'grey' }}>Total Value (JUP) </span>
            <br />

            <span style={{ fontSize: '3rem' }}>{balance}</span>
          </Box>

          <Box style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <SendJup />
            <ReceiveJup />
          </Box>

          <Transactions />
        </Box>
      </Drawer>

      <ListItem disablePadding>
        <ListItemButton
          onClick={() => openDrawer()}
          sx={{
            borderRadius: '10px',
            height: '60px',
            minHeight: '60px',
            marginBottom: '10px',
            transition: 'ease-in-out 200ms',
          }}
        >
          <ListItemIcon>
            <Box
              component="img"
              src={walletIcon}
              alt="wallet icon"
              sx={{ height: '24px', width: '24px' }}
            />
          </ListItemIcon>
          <ListItemText primary="Wallet" />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default Wallet;
