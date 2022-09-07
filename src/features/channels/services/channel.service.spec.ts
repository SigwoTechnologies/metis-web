import channelService from './channel.service';

describe('Channel Service', () => {
  describe('When calling findChannels function', () => {
    it('should return an array of channels', async () => {
      const expected = [
        {
          channelAddress: 'JUP-VHVJ-WEBM-N5NR-3CV33',
          channelPublicKey: '19d206b972aa2a7b5756a1797bd0901e2352d327e0906ebec717402ce54cb059',
          channelName: 'testing',
          createdBy: 'JUP-5FX8-JXLL-GLAV-7MG6P',
          createdAt: 1656711221005,
        },
      ];

      jest.spyOn(channelService, 'findChannels').mockResolvedValue(expected);

      const actual = await channelService.findChannels(null, {});

      expect(channelService.findChannels).toHaveBeenCalled();
      expect(actual.length).toEqual(expected.length);
      expect(actual[0].channelAddress).toEqual(expected[0].channelAddress);
      expect(actual[0].channelPublicKey).toEqual(expected[0].channelPublicKey);
      expect(actual[0].channelName).toEqual(expected[0].channelName);
      expect(actual[0].createdBy).toEqual(expected[0].createdBy);
      expect(actual[0].createdAt).toEqual(expected[0].createdAt);
    });
  });
});
