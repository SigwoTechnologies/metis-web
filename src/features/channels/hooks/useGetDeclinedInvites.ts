import hasStringJsonStructure from '@metis/common/utils/utils';

export const localStorageKeyDeclinedInvites = '@declinedInvites';

export const useGetDeclinedInvites = (): number[] => {
  const data = localStorage.getItem(localStorageKeyDeclinedInvites);
  return hasStringJsonStructure(data) ? JSON.parse(data as string) : [];
};
