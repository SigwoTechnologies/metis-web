import connect from '@metis/common/services/socket.service';

type SuccessfulChannelCreation = {
  jobId: number;
  channelName: string;
  channelAddress: string;
};

type FailedChannelCreation = { jobId: number; channelAddress: string };

export default () => {
  // TODO: change this hardcoded value with real values
  const channelSocket = connect({
    query: {
      room: 'JUP-5FX8-JXLL-GLAV-7MG6P', // address of the current user
      user: 'jonadev3000', // alias of the current user
    },
  }).socket('/channels');

  channelSocket.connect();

  const onChannelCreated = (callback: (data: SuccessfulChannelCreation) => void) =>
    channelSocket.on('channelSuccessful', (channelCreatedData: SuccessfulChannelCreation) => {
      callback(channelCreatedData);
      channelSocket.disconnect();
    });

  const onChannelCreationFailed = (callback: (data: number | FailedChannelCreation) => void) =>
    channelSocket.on('channelCreationFailed', (channelFailedData: FailedChannelCreation) => {
      callback(channelFailedData);
      channelSocket.disconnect();
    });

  return { onChannelCreated, onChannelCreationFailed };
};
