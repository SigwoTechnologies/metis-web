import { localStorageKeyDeclinedInvites, useGetDeclinedInvites } from './useGetDeclinedInvites';

export const useDeclineInvites = (invitationId: number) => {
  const declinedInvites = useGetDeclinedInvites();

  if (!declinedInvites.length) {
    localStorage.setItem(
      localStorageKeyDeclinedInvites,
      JSON.stringify([...declinedInvites, invitationId])
    );
  }
  declinedInvites.map((e: number) => {
    if (e !== invitationId) {
      localStorage.setItem(
        localStorageKeyDeclinedInvites,
        JSON.stringify([...declinedInvites, invitationId])
      );
    }

    return e;
  });
};
