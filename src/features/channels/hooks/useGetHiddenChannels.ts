import hasStringJsonStructure from '@metis/common/utils/utils';

export const localStorageKeyHiddenChannel = '@hiddenChannels';

export const getHiddenChannels = () => {
  const hiddenChannels = localStorage.getItem(localStorageKeyHiddenChannel);
  return hasStringJsonStructure(hiddenChannels) ? JSON.parse(<string>hiddenChannels) : [];
};
