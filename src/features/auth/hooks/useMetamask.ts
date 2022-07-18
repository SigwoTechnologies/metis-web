import { useEffect, useState } from 'react';

const useMetamask = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [account, setAccount] = useState('');

  // TODO: reserach if we can create jup accounts with testnet in metamatask (eth testnet => jupiter)

  const accountsChanged = async (newAccount: string) => setAccount(newAccount);

  const connect = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        await accountsChanged(res[0]);
      } catch (err) {
        setErrorMessage('There was a problem connecting to MetaMask');
      }
    } else {
      setErrorMessage('Install MetaMask');
    }
  };

  const chainChanged = () => {
    setErrorMessage('');
    setAccount('');
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accountsChanged);
      window.ethereum.on('chainChanged', chainChanged);
    }
  }, []);

  return {
    account,

    errorMessage,
    connect,
  };
};

export default useMetamask;
