import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  setEthAccount,
  setIsConnectedToMetamask,
  setIsConnectingToMetamask,
} from '../store/auth.slice';
// TODO: Make sure that only metamask provider is supported by the app (avoid overrides)
// ref: https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider
const MetamaskNotice: FC<{ connect: () => void }> = ({ connect }) => (
  <div>
    User rejected the request.
    <span
      style={{
        display: 'flex',
        border: '1px solid',
        color: '#fff',
        padding: '5px',
        margin: '0.5rem 1rem 0 1rem',
        justifyContent: 'center',
        textDecoration: 'none',
        borderRadius: '5px',
      }}
      onClick={connect}
    >
      Try Again?
    </span>
  </div>
);
export const useMetamask = () => {
  const dispatch = useAppDispatch();
  const { isConnectedToMetamask, hasMetamask, ethAccount } = useAppSelector((state) => state.auth);

  // TODO: Add a prompt to warn the user when is a creating a testnet account

  const connect = () => {
    dispatch(setIsConnectingToMetamask(true));
    window.ethereum
      .request({
        method: 'eth_requestAccounts',
      })
      .then(([selectedAccount]: [string]) => {
        dispatch(setIsConnectedToMetamask(true));
        dispatch(setEthAccount(selectedAccount));
        dispatch(setIsConnectingToMetamask(false));
      })
      .catch((error: Error) => {
        if (error.message.match(/rejected/)) {
          dispatch(setIsConnectingToMetamask(false));
          toast.error(<MetamaskNotice connect={connect} />, {
            theme: 'colored',
          });
        }
      });
  };
  useEffect(() => {
    if (hasMetamask && !isConnectedToMetamask) {
      connect();
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', ([selectedAccount]: string[]) => {
        dispatch(setEthAccount(selectedAccount));
      });
      window.ethereum.on('accountsChanged', ([selectedAccount]: string[]) => {
        if (!selectedAccount) {
          connect();
        }
      });
    }
  }, [ethAccount]);

  return { connect };
};
