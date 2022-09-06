import { useAppDispatch } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { setIsConnectingToMetamask } from '../store/auth.slice';
import MetamaskNotice from '../components/metamask-notice/MetamaskNotice';

// TODO: Make sure that only metamask provider is supported by the app (avoid overrides)
// ref: https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

const checkNavigator = () => Boolean(navigator.userAgent.toLowerCase().match(/chrome|firefox|edge|brave/));

const useMetamask = () => {
  const dispatch = useAppDispatch();
  const [account, setAccount] = useState('');

  // TODO: Add a prompt to warn the user when is a creating a testnet account
  const accountsChanged = async (newAccount: string) => setAccount(newAccount);

  const connect = async () => {
    const navigatorIsValid = checkNavigator();
    if (!navigatorIsValid) {
      dispatch(openToast({ text: 'Navigator is not compatible with MetaMask', type: 'error' }));
      return;
    }

    if (!window.ethereum) {
      toast.error(MetamaskNotice, {
        theme: 'colored',
      });
      return;
    }

    try {
      dispatch(setIsConnectingToMetamask(true));
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      await accountsChanged(accounts[0]);
    } catch (err) {
      dispatch(openToast({ text: 'There was a problem connecting to MetaMask', type: 'error' }));
      dispatch(setIsConnectingToMetamask(false));
    }
  };

  const chainChanged = () => setAccount('');

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => accountsChanged(accounts[0]));
      window.ethereum.on('chainChanged', chainChanged);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', accountsChanged);
        window.ethereum.removeListener('chainChanged', chainChanged);
      }
    };
  }, []);

  return { account, connect };
};

export default useMetamask;
