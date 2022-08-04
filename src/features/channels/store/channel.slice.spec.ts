import { AnyAction } from '@reduxjs/toolkit';
import store from '@metis/store';
import { Channel } from '../types/channel';
import { findChannels } from './channel.actions';
import { channelReducer, ChannelState, selectChannel, selectState } from './channel.slice';

describe('Channel Slice', () => {
  let initialState: ChannelState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      channels: [],
      hiddenChannels: [],
      selectedChannel: {
        channelAddress: '',
        channelPublicKey: '',
        channelName: '',
        createdBy: '',
        createdAt: 0,
      },
      reply: {
        active: false,
        name: '',
        message: '',
      },
      mutedChannels: [],
    };
  });

  describe('When loading slice', () => {
    it('should return the initial state', () => {
      const expected = initialState;

      const actual = channelReducer(undefined, {} as AnyAction);

      expect(actual).toEqual(expected);
    });
  });

  describe('When findChannels function is called', () => {
    describe('and the response is pending', () => {
      it('should set the isLoading flag to true', () => {
        const expected = initialState;
        expected.isLoading = true;

        const actual = channelReducer(undefined, findChannels.pending('', null));

        expect(actual).toEqual(initialState);
      });
    });
    describe('and the response is successfull', () => {
      const channels: Channel[] = [
        {
          channelAddress: 'JUP-VHVJ-WEBM-N5NR-3CV33',
          channelPublicKey: '19d206b972aa2a7b5756a1797bd0901e2352d327e0906ebec717402ce54cb059',
          channelName: 'testing',
          createdBy: 'JUP-5FX8-JXLL-GLAV-7MG6P',
          createdAt: 1656711221005,
        },
      ];

      // TODO: this test doesn't work because of localstorage, fix it
      // it('should assign the list of channels', () => {
      //   const expected = initialState;
      //   expected.channels = channels;

      //   const actual = channelReducer(undefined, findChannels.fulfilled(channels, ''));

      //   expect(actual).toEqual(expected);
      // });
    });
    describe('and the function fails', () => {
      it('should set the isLoading flag to false', () => {
        const expected = initialState;

        const actual = channelReducer(undefined, findChannels.rejected(null, '', null));

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('When selectChannel is called', () => {
    it('should check if the channel list contains a channel with the selected channelName', () => {
      const expected = initialState;

      const actual = channelReducer(initialState, selectChannel('hello'));

      expect(actual).toEqual(expected);
    });

    it('should set the selectedChannel to the passed value', () => {
      const testingChannel = {
        channelAddress: 'JUP-VHVJ-WEBM-N5NR-3CV33',
        channelPublicKey: '19d206b972aa2a7b5756a1797bd0901e2352d327e0906ebec717402ce54cb059',
        channelName: 'testing',
        createdBy: 'JUP-5FX8-JXLL-GLAV-7MG6P',
        createdAt: 1656711221005,
      };
      const expected = initialState;
      expected.selectedChannel = testingChannel;
      expected.channels.push(testingChannel);

      const actual = channelReducer(initialState, selectChannel(testingChannel));

      expect(actual.selectedChannel).toEqual(expected.selectedChannel);
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
