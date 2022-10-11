/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable quotes */
import { convertNQTToJup } from '@metis/common/utils/utils';
import fetchBalance from '@metis/features/wallet/services/fetchBalance';
import fetchTransactions from '@metis/features/wallet/services/fetchTransactions';
import { useAppSelector } from '@metis/store/hooks';
import SendIcon from '@mui/icons-material/Send';
import {
  Avatar,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import Box from '@mui/material/Box';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useStyles from './Transactions.styles';

const Transactions = () => {
  const classes = useStyles();
  const { jupAccount } = useAppSelector((state) => state.auth);
  const { transactions, balance } = useAppSelector((state) => state.wallet);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchTransactions(dispatch);
  }, [balance]);

  if (!transactions.length) {
    return <CircularProgress className={classes.spinner} />;
  }

  return (
    <Box>
      Transactions
      <List>
        {transactions.map((e) => (
          <Fragment key={e.block}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemAvatar className={classes.listItemIcon}>
                  <Avatar>
                    <SendIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={e.senderRS === jupAccount.address ? 'Sent JUP' : 'Received JUP'}
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
        ))}
      </List>
    </Box>
  );
};

export default Transactions;
