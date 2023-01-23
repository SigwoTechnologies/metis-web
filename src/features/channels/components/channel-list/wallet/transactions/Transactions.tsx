/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable quotes */
import { SpinnerContainer } from '@metis/common/components/ui/spinner-container/SpinnerContainer';
import httpService from '@metis/common/services/http.service';
import { convertNQTToJup } from '@metis/common/utils/utils';
import { TTransaction } from '@metis/features/wallet/types/TTransaction';
import { useAppSelector } from '@metis/store/hooks';
import sendJUPIcon from '@metis/assets/images/misc/sendJUPIcon.svg';
import receiveJUPIcon from '@metis/assets/images/misc/receiveJUPIcon.svg';
import Typography from '@mui/material/Typography';
import transactionsIcon from '@metis/assets/images/misc/transactionsIcon.svg';
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
    <Box className={classes.transaction}>
      <Typography
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px 0' }}
      >
        Transactions
        <Box
          component="img"
          src={transactionsIcon}
          alt="transactions icon"
          sx={{ marginLeft: '5px' }}
        />
      </Typography>
      <List sx={{ padding: '0 !important' }}>
        <SpinnerContainer isLoading={!data}>
          {data?.transactions.map((e) => (
            <Fragment key={e.block}>
              <ListItem disablePadding className={classes.listItem}>
                <ListItemButton className={classes.listItemButton}>
                  {e.senderRS === jupAccount.address ? (
                    <Box className={classes.renderedItem} sx={{ backgroundColor: '#243716' }}>
                      <ListItemAvatar className={classes.listItemIcon}>
                        <Avatar>
                          <Box
                            component="img"
                            src={sendJUPIcon}
                            alt="send JUP Icon"
                            sx={{ marginLeft: '5px' }}
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <Typography sx={{ fontSize: '0.8rem' }}>
                        <Typography sx={{ color: '#61D90C', fontSize: '1rem' }}>
                          Sent JUP
                        </Typography>
                        You have sent {convertNQTToJup(Number(e.amountNQT))} JUP <br />
                        to {e.senderRS === jupAccount.address ? e.recipientRS : e.senderRS}
                      </Typography>
                    </Box>
                  ) : (
                    <Box className={classes.renderedItem} sx={{ backgroundColor: '#0dc7fa29' }}>
                      <ListItemAvatar className={classes.listItemIcon}>
                        <Avatar>
                          <Box
                            component="img"
                            src={receiveJUPIcon}
                            alt="send JUP Icon"
                            sx={{ marginLeft: '5px' }}
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <Typography sx={{ fontSize: '0.8rem' }}>
                        <Typography sx={{ color: '#0DC7FA', fontSize: '1rem' }}>
                          Received JUP
                        </Typography>
                        You have received {convertNQTToJup(Number(e.amountNQT))} JUP <br />
                        from {e.senderRS === jupAccount.address ? e.recipientRS : e.senderRS}
                      </Typography>
                    </Box>
                  )}
                </ListItemButton>
              </ListItem>
            </Fragment>
          ))}
        </SpinnerContainer>
      </List>
    </Box>
  );
};

export default Transactions;
