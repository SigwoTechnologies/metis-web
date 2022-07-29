import { useEffect, useState } from 'react';
import { useAppDispatch } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';

// TODO: Make sure that only metamask provider is supported by the app (avoid overrides)
// ref: https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

const useMetamask = () => {
  const dispatch = useAppDispatch();
  const [account, setAccount] = useState('');

  // TODO: Add a prompt to warn the user when is a creating a testnet account
  const accountsChanged = async (newAccount: string) => setAccount(newAccount);

  const connect = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        await accountsChanged(accounts[0]);
      } catch (err) {
        dispatch(openToast({ text: 'There was a problem connecting to MetaMask', type: 'error' }));
      }
    } else {
      dispatch(openToast({ text: 'Install MetaMask', type: 'error' }));
    }
  };

  const chainChanged = () => setAccount('');

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accountsChanged);
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