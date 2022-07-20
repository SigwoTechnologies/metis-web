import { useEffect, useState } from 'react';
import { useAppDispatch } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import metamaskService from '@metis/common/services/metamask.service';

const useMetamask = () => {
  const dispatch = useAppDispatch();
  const [account, setAccount] = useState('');

  // TODO: Add a prompt to warn the user when is a creating a testnet account
  const accountsChanged = async (newAccount: string) => setAccount(newAccount);

  const connect = async () => {
    if (metamaskService.ethereum) {
      try {
        const accounts = await metamaskService.requestAccounts();

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
    if (metamaskService.ethereum) {
      metamaskService.on('accountsChanged', accountsChanged);
      metamaskService.on('chainChanged', chainChanged);
    }
    return () => {
      metamaskService.removeListener('accountsChanged', accountsChanged);
      metamaskService.removeListener('chainChanged', chainChanged);
    };
  }, []);

  return { account, connect };
};

export default useMetamask;
