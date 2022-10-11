import { AnyAction } from '@reduxjs/toolkit';
import { TWalletState, walletReducer } from './wallet.slice';

describe('Wallet Slice', () => {
  let initialState: TWalletState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      isOpenWallet: false,
      transactions: [],
      balance: 0,
    };
  });

  describe('When loading slice', () => {
    it('should return the initial state', () => {
      const expected = initialState;

      const actual = walletReducer(undefined, {} as AnyAction);

      expect(actual).toEqual(expected);
    });
  });
});
