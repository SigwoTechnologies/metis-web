import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const useMetamask = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');

  // TODO: reserach if we can create jup accounts with testnet in metamatask (eth testnet => jupiter)

  const accountsChanged = async (newAccount: string) => {
    setAccount(newAccount);
    try {
      const response = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [newAccount.toString(), 'latest'],
      });
      setBalance(ethers.utils.formatEther(response));
    } catch (err) {
      setErrorMessage('There was a problem connecting to MetaMask');
    }
  };

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
    setBalance('');
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accountsChanged);
      window.ethereum.on('chainChanged', chainChanged);
    }
  }, []);

  return {
    account,
    balance,
    errorMessage,
    connect,
  };
};

export default useMetamask;
