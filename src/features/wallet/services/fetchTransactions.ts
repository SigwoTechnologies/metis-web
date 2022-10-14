import httpService from '@metis/common/services/http.service';
import { getToken } from '@metis/common/services/token.service';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchTransactions = createAsyncThunk('wallet/fetchTransactions', async () => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };

  const {
    data: { transactions },
  } = await httpService.get('/v1/api/recent-transactions', { headers });

  return transactions;
});

export default fetchTransactions;
