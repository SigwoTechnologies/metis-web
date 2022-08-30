import { useEffect, useState } from 'react';
import { useAppDispatch } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import { setIsConnectingToMetamask } from '../store/auth.slice';

// TODO: Make sure that only metamask provider is supported by the app (avoid overrides)
// ref: https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

const useMetamask = () => {
  const dispatch = useAppDispatch();
  const [account, setAccount] = useState('');

  // TODO: Add a prompt to warn the user when is a creating a testnet account
  const accountsChanged = async (newAccount: string) => setAccount(newAccount);

  // eslint-disable-next-line consistent-return
  const connect = async () => {
    if (!window.ethereum) return dispatch(openToast({ text: 'Install MetaMask', type: 'error' }));

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

  // TODO: This whole thing makes the state change two times, so the component re renders
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
