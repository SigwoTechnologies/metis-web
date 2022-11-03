/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable quotes */
import { SpinnerContainer } from '@metis/common/components/ui/spinner-container/SpinnerContainer';
import httpService from '@metis/common/services/http.service';
import { convertNQTToJup } from '@metis/common/utils/utils';
import { TTransaction } from '@metis/features/wallet/types/TTransaction';
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
import { Fragment } from 'react';
import useSWR from 'swr';
import useStyles from './Transactions.styles';

const Transactions = () => {
  const classes = useStyles();
  const { jupAccount } = useAppSelector((state) => state.auth);

  const { data } = useSWR<{ transactions: TTransaction[] }>('/v1/api/recent-transactions');

  return (
    <Box>
      Transactions
      <List>
        <SpinnerContainer isLoading={!data}>
          {data?.transactions.map((e) => (
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
        </SpinnerContainer>
      </List>
    </Box>
  );
};

export default Transactions;
