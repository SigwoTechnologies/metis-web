/* eslint-disable camelcase */
import constants from '@metis/common/configuration/constants';
import httpService from '@metis/common/services/http.service';
import { openToast } from '@metis/store/ui/ui.slice';
import { Dispatch } from '@reduxjs/toolkit';
import { setTransactions } from '../store/wallet.slice';

const fetchTransactions = async (dispatch: Dispatch) => {
  try {
    const { access_token } = JSON.parse(JSON.parse(String(localStorage.getItem(constants.TOKEN))));
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    };

    const {
      data: { transactions },
    } = await httpService.get('/v1/api/recent-transactions', { headers });

    dispatch(setTransactions(transactions));
  } catch (error) {
    dispatch(openToast({ type: 'error', text: 'There was a problem getting the channels' }));
  }
};

export default fetchTransactions;
