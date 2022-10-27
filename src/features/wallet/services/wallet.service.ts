import httpService from '@metis/common/services/http.service';
import { AxiosError } from 'axios';

export const getBalance = async () => {
  try {
    const {
      data: { balance },
    } = await httpService.get('/v1/api/balance');
    return balance;
  } catch (error) {
    const err = error as AxiosError;
    return err.response;
  }
};

export const getTransactions = async () => {
  try {
    const {
      data: { transactions },
    } = await httpService.get('/v1/api/recent-transactions');
    return transactions;
  } catch (error) {
    const err = error as AxiosError;
    return err.response;
  }
};
