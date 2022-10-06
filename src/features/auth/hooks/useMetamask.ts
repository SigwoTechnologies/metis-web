import { useAppDispatch } from '@metis/store/hooks';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import MetamaskNotice from '../components/metamask-notice/MetamaskNotice';
import { setIsConnectedToMetamask, setIsConnectingToMetamask } from '../store/auth.slice';
// TODO: Make sure that only metamask provider is supported by the app (avoid overrides)
// ref: https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

const useMetamask = () => {
  const dispatch = useAppDispatch();
  const [account, setAccount] = useState('');

  const connect = async () => {
    if (!window.ethereum) {
      toast.error(MetamaskNotice, {
        theme: 'colored',
      });
      return;
    }

    try {
      dispatch(setIsConnectingToMetamask(true));
      const [selectedAccount] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      dispatch(setIsConnectedToMetamask(true));
      setAccount(selectedAccount);
    } catch (err) {
      dispatch(setIsConnectingToMetamask(false));
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', ([selectedAccount]: string[]) =>
        setAccount(selectedAccount)
      );
      window.ethereum.on('chainChanged', () => setAccount(''));
    }
  }, []);

  return { account, connect };
};

export default useMetamask;
