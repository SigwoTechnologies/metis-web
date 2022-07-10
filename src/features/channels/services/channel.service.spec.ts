import httpService from 'src/common/services/http.service';
import channelService from './channel.service';

describe('Channel Service', () => {
  describe('When calling findByUser function', () => {
    it('should return an array of channels', async () => {
      const expected = [
        {
          name: 'channel 1',
          url: 'url1',
        },
        {
          name: 'channel 2',
          url: 'url 2',
        },
      ];

      jest.spyOn(httpService, 'get').mockResolvedValue({ data: { results: expected } });

      const actual = await channelService.findByUser();

      expect(httpService.get).toHaveBeenCalled();
      expect(actual.length).toEqual(expected.length);
      expect(actual[0].name).toEqual(expected[0].name);
      expect(actual[0].url).toEqual(expected[0].url);
    });
  });
});
