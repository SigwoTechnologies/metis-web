import httpService from '@metis/common/services/http.service';
import { getToken } from '@metis/common/services/token.service';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchBalance = createAsyncThunk('wallet/fetchBalance', async () => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
  const {
    data: { balance },
  } = await httpService.get('/v1/api/balance', { headers });
  return balance;
});

export default fetchBalance;
