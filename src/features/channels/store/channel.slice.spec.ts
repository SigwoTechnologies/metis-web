import { AnyAction } from '@reduxjs/toolkit';
import store from 'src/store';
import { Channel } from '../types/channel';
import { findByUser } from './channel.actions';
import { channelReducer, ChannelState, selectState } from './channel.slice';

describe('Channel Slice', () => {
  let initialState: ChannelState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      channels: [],
    };
  });

  describe('When loading slice', () => {
    it('should return the initial state', () => {
      const expected = initialState;

      const actual = channelReducer(undefined, {} as AnyAction);

      expect(actual).toEqual(expected);
    });
  });

  describe('When findByUser function is called', () => {
    describe('and the response is pending', () => {
      it('should set the isLoading flag to true', () => {
        const expected = initialState;
        expected.isLoading = true;

        const actual = channelReducer(undefined, findByUser.pending(''));

        expect(actual).toEqual(initialState);
      });
    });
    describe('and the response is successfull', () => {
      const channels: Channel[] = [
        {
          id: 1,
          name: 'channel 1',
          url: 'url 1',
        },
        {
          id: 2,
          name: 'channel 2',
          url: 'url 2',
        },
      ];

      it('should assign the list of channels', () => {
        const expected = initialState;
        expected.channels = channels;

        const actual = channelReducer(undefined, findByUser.fulfilled(channels, ''));

        expect(actual).toEqual(expected);
      });
    });
    describe('and the function fails', () => {
      it('should set the isLoading flag to false', () => {
        const expected = initialState;

        const actual = channelReducer(undefined, findByUser.rejected(null, ''));

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('When selectState selector is called', () => {
    it('should return the channel state', () => {
      const expected = initialState;

      const actual = selectState(store.getState());

      expect(actual).toEqual(expected);
    });
  });
});
