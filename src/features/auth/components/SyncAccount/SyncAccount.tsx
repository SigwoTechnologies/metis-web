import { verifyAlreadyRegistered } from '@metis/features/auth/store/auth.actions';
import { useEffect, useState, useLayoutEffect } from 'react';
import { Socket } from 'socket.io-client';
import { localStorageKeyDeclinedInvites } from '@metis/features/channels/hooks/useGetDeclinedInvites';
import { useAppSelector, useAppDispatch } from '@metis/store/hooks';
import { localStorageKeyHiddenChannel } from '@metis/features/channels/hooks/useGetHiddenChannels';
import { openNotification } from '@metis/store/ui/ui.slice';
import { randomNumbers, browserFeatures } from '@metis/common/utils/utils';
import connectSocket from '@metis/common/services/socket.service';
import constants from '@metis/common/configuration/constants';
import { AccountSynchronized } from './SyncModals/AccountSynchronized';
import { EnterCode } from './SyncModals/EnterCode';
import { SyncRequest } from './SyncModals/SyncRequest';
import { SyncRequested } from './SyncModals/SyncRequested';
import { ICode } from '../../types/code.inteface';

export const SyncAccount = () => {
  const dispatch = useAppDispatch();
  const [syncDeviceRequested, setSyncDeviceRequested] = useState(false);
  const [socketConnected, setSocketConnected] = useState<Socket>();
  const { ethAccount, isAlreadyRegistered } = useAppSelector((state) => state.auth);
  const [credentials, setCredentials] = useState(false);
  const [synchronized, setSynchronized] = useState(false);
  const [modalSynchronized, setModalSynchronized] = useState(true);
  const [modalSecurityStep, setModalSecurityStep] = useState(false);
  const [deviceFeatureRequest, setDeviceFeatureRequest] = useState('');
  const [codeSecurityRequest, setCodeSecurityRequest] = useState(0);

  useLayoutEffect(() => {
    if (ethAccount) {
      dispatch(verifyAlreadyRegistered(ethAccount));
    }

    const credentialsFound = localStorage.getItem(constants.CREDENTIALS);
    if (credentialsFound) {
      setCredentials(true);
    }
  }, [ethAccount]);

  const timeExpired = () => {
    if (credentials || synchronized) return;
    dispatch(
      openNotification({
        text: 'Time expired for synchronization',
        type: 'error',
      })
    );
    setSyncDeviceRequested(false);
    setModalSecurityStep(false);
  };

  useEffect(() => {
    const socket = connectSocket({
      query: {
        room: `sync-devices-${ethAccount}`,
        user: ethAccount,
      },
    }).socket('/sync-devices');

    if (socket) {
      setSocketConnected(socket);
    }

    socket.on('sync-devices-requested', ({ deviceFeatures, codeSecurity }) => {
      setSyncDeviceRequested(true);
      setDeviceFeatureRequest(deviceFeatures);
      setCodeSecurityRequest(codeSecurity);
      setTimeout(() => timeExpired(), 60_000);
    });

    socket.on('sync-devices-granted', (data) => {
      localStorage.setItem(constants.CREDENTIALS, data.credentials);
      localStorage.setItem(localStorageKeyDeclinedInvites, data.hiddenChannels);
      localStorage.setItem(localStorageKeyHiddenChannel, data.declinedInvites);
      localStorage.setItem(constants.RECOVERY_CREDS, data.recoveryCreds);
      dispatch(
        openNotification({
          text: 'Sync request granted',
          type: 'success',
        })
      );
      setSyncDeviceRequested(false);
      setSynchronized(true);
    });

    socket.on('sync-devices-rejected', () => {
      dispatch(
        openNotification({
          text: 'Sync request rejected',
          type: 'error',
        })
      );
      setSyncDeviceRequested(false);
    });
  }, [ethAccount]);

  const sendSyncRequest = () => {
    const code = randomNumbers(5);
    socketConnected?.emit('sync-devices-request', {
      ethAccount,
      deviceFeatures: browserFeatures(),
      codeSecurity: code,
    });
    setCodeSecurityRequest(code);
    setTimeout(() => timeExpired(), 60_000);
  };

  const sendRejectSync = () => {
    socketConnected?.emit('sync-devices-reject');
    setSyncDeviceRequested(false);
    setModalSecurityStep(false);
  };

  const sendGrantSync = ({ code }: ICode) => {
    if (!code || Math.floor(Number(code)) !== codeSecurityRequest) {
      sendRejectSync();
      dispatch(
        openNotification({
          text: 'Incorrect security code',
          type: 'error',
        })
      );
      return;
    }
    const credentialsFound = localStorage.getItem(constants.CREDENTIALS);
    const declinedInvites = localStorage.getItem(localStorageKeyDeclinedInvites);
    const hiddenChannels = localStorage.getItem(localStorageKeyHiddenChannel);
    const recoveryCreds = localStorage.getItem(constants.RECOVERY_CREDS);
    socketConnected?.emit('sync-devices-grant', {
      credentials: credentialsFound,
      hiddenChannels,
      declinedInvites,
      recoveryCreds,
    });
    setSyncDeviceRequested(false);
    setModalSecurityStep(false);
  };

  return (
    <>
      {syncDeviceRequested && credentials && (
        <SyncRequested
          deviceFeatureRequest={deviceFeatureRequest}
          setModalSecurityStep={setModalSecurityStep}
          sendRejectSync={sendRejectSync}
        />
      )}

      {isAlreadyRegistered && !credentials && (
        <SyncRequest
          synchronized={synchronized}
          syncDeviceRequested={syncDeviceRequested}
          sendSyncRequest={sendSyncRequest}
          codeSecurityRequest={codeSecurityRequest}
        />
      )}
      {credentials && (
        <EnterCode
          modalSecurityStep={modalSecurityStep}
          sendGrantSync={sendGrantSync}
          sendRejectSync={sendRejectSync}
        />
      )}
      {!syncDeviceRequested && synchronized && (
        <AccountSynchronized
          credentials={credentials}
          modalSynchronized={modalSynchronized}
          setModalSynchronized={setModalSynchronized}
        />
      )}
    </>
  );
};
