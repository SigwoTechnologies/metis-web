import constants from '@metis/common/configuration/constants';
import httpService from '@metis/common/services/http.service';
import { openToast } from '@metis/store/ui/ui.slice';
import { Dispatch } from '@reduxjs/toolkit';
import { setBalance } from '../store/wallet.slice';

/* eslint-disable camelcase */
const fetchBalance = async (dispatch: Dispatch) => {
  try {
    const { access_token } = JSON.parse(JSON.parse(String(localStorage.getItem(constants.TOKEN))));
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    };

    const {
      data: { balance },
    } = await httpService.get('/v1/api/balance', { headers });

    dispatch(setBalance(balance));
  } catch (error) {
    dispatch(openToast({ type: 'error', text: 'There was a problem getting the balance' }));
  }
};

export default fetchBalance;
