import { useAppDispatch } from '@metis/store/hooks';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import MetamaskNotice from '../components/metamask-notice/MetamaskNotice';
import { setIsConnectingToMetamask } from '../store/auth.slice';

// TODO: Make sure that only metamask provider is supported by the app (avoid overrides)
// ref: https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

const useMetamask = () => {
  const dispatch = useAppDispatch();
  const [account, setAccount] = useState('');

  // TODO: Add a prompt to warn the user when is a creating a testnet account
  const accountsChanged = async (newAccount: string) => setAccount(newAccount);

  const connect = async () => {
    if (!navigator.userAgent.toLowerCase().match(/chrome|firefox|edge|brave/)) {
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
      const [selectedAccount] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      await accountsChanged(selectedAccount);
    } catch (err) {
      dispatch(setIsConnectingToMetamask(false));
    }
  };

  const chainChanged = () => setAccount('');

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', ([selectedAccount]: string[]) =>
        accountsChanged(selectedAccount)
      );
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
