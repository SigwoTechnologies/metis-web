import httpService from '@metis/common/services/http.service';
import { getToken } from '@metis/common/services/token.service';
import { convertNQTToJup } from '@metis/common/utils/utils';
import { useAppSelector } from '@metis/store/hooks';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import CloseIcon from '@mui/icons-material/Close';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Box from '@mui/material/Box';
import { Fragment, useEffect, useState } from 'react';
import ReceiveJup from './receive-jup/receive-jup';
import SendJup from './send-jup/send-jup';
import useStyles from './Wallet.styles';

type TTransaction = {
  amountNQT: string;
  block: string;
  blockTimestamp: number;
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
    const token = getToken();
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const {
      data: { transactions: recentTransactions },
    } = await httpService.get('/v1/api/recent-transactions', { headers });
    setTransactions(recentTransactions);
  };

  const getBalance = async () => {
    const token = getToken();
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const {
      data: { balance: balanceFetched },
    } = await httpService.get('/v1/api/balance', { headers });

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

          <Box>
            <span style={{ color: 'grey' }}>Total Value (JUP) </span>
            <br />

            <span style={{ fontSize: '3rem' }}>{balance}</span>
          </Box>

          <Box style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <SendJup balance={balance} getBalance={getBalance} />
            <ReceiveJup />
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            Transactions
            <List>
              {transactions
                ? transactions.map((e) => (
                    <Fragment key={e.block}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText
                            primary={
                              <>
                                <span>
                                  {e.senderRS === jupAccount.address
                                    ? 'Sent JUP '
                                    : 'Received JUP '}
                                </span>
                                {/* TO-DO: research how to show date  */}
                                {/* <small>{dayjs(e.timestamp).format('MM/DD/YYYY')}</small> */}
                              </>
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
