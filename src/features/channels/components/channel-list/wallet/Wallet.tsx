/* eslint-disable camelcase */
/* eslint-disable quotes */
import appConfig from '@metis/common/configuration/app.config';
import constants from '@metis/common/configuration/constants';
import { convertNQTToJup } from '@metis/common/utils/utils';
import { useAppSelector } from '@metis/store/hooks';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import ReceiveJup from './receive-jup/receive-jup';
import SendJup from './send-jup/send-jup';
import useStyles from './Wallet.styles';

type TTransaction = {
  amountNQT: string;
  block: string;
  confirmations: number;
  ecBlockHeight: number;
  ecBlockId: string;
  feeNQT: string;
  fullHash: string;
  height: number;
  phased: boolean;
  recipient: string;
  recipientRS: string;
  sender: string;
  senderPublicKey: string;
  senderRS: string;
  signature: string;
  signatureHash: string;
  subtype: number;
  timestamp: number;
  transaction: string;
  transactionIndex: number;
  type: number;
};

const Wallet = () => {
  const classes = useStyles();
  const { jupAccount } = useAppSelector((state) => state.auth);
  const [isOpenWallet, setIsOpenWallet] = useState(false);
  const [transactions, setTransactions] = useState<TTransaction[]>([]);
  const [balance, setBalance] = useState(0);

  const getTransactions = async () => {
    const { access_token } = JSON.parse(JSON.parse(String(localStorage.getItem(constants.TOKEN))));
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    };
    const {
      data: { transactions: recentTransactions },
    } = await axios.get(`${appConfig.api.baseUrl}/v1/api/recent-transactions`, { headers });
    setTransactions(recentTransactions);
  };

  const getBalance = async () => {
    const { access_token } = JSON.parse(JSON.parse(String(localStorage.getItem(constants.TOKEN))));
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    };
    const {
      data: { balance: balanceFetched },
    } = await axios.get(`${appConfig.api.baseUrl}/v1/api/balance`, { headers });

    setBalance(balanceFetched);
  };

  useEffect(() => {
    getTransactions();
    getBalance();
  }, []);

  const closeDrawer = () => {
    setIsOpenWallet(false);
  };

  const openDrawer = () => {
    setIsOpenWallet(true);
  };

  return (
    <>
      <Drawer anchor="left" open={isOpenWallet} onClose={closeDrawer}>
        <Box role="presentation" className={classes.drawerContainer}>
          <IconButton aria-label="close" onClick={closeDrawer} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>

          <Box>Balance: {balance}</Box>

          <Box style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <SendJup balance={balance} getBalance={getBalance} />
            <ReceiveJup />
          </Box>

          <Box>
            Transactions
            <List>
              {transactions
                ? transactions.map((e) => (
                    <Fragment key={e.block}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemAvatar className={classes.listItemIcon}>
                            <Avatar>
                              <SendIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              e.senderRS === jupAccount.address ? 'Sent JUP' : 'Received JUP'
                            }
                            secondary={`You has ${
                              e.senderRS === jupAccount.address ? 'Sent' : 'Received'
                            } ${convertNQTToJup(Number(e.amountNQT))} JUP ${
                              e.senderRS === jupAccount.address ? 'to' : 'from'
                            } ${e.senderRS === jupAccount.address ? e.recipientRS : e.senderRS} `}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </Fragment>
                  ))
                : ''}
            </List>
          </Box>
        </Box>
      </Drawer>

      <ListItem disablePadding>
        <ListItemButton onClick={() => openDrawer()}>
          <ListItemIcon className={classes.listItemIcon}>
            <AllInboxIcon />
          </ListItemIcon>
          <ListItemText primary="Wallet" />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default Wallet;
