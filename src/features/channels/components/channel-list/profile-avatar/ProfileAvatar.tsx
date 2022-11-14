import PlaceholderAvatar from '@metis/assets/images/avatars/astronaut.png';
import connectSocket from '@metis/common/services/socket.service';
import { SpinnerContainer } from '@metis/common/components/ui/spinner-container/SpinnerContainer';
import { findImage } from '@metis/features/auth/store/auth.actions';
import { useUploadImage } from '@metis/features/channels/hooks/useUploadImage';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Avatar, Grid, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import Files from 'react-files';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import appConfig from '@metis/common/configuration/app.config';
import useStyles from './ProfileAvatar.styles';

type TFile = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

const ProfileAvatar = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const {
    jupAccount: { address, alias },
    imageAccount,
  } = useAppSelector((state) => state.auth);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (uploadingImage) {
      const socket = connectSocket({
        query: {
          room: `upload-${address}`,
          user: address,
        },
      }).socket('/upload');

      socket.on('uploadCreated', async ({ url }: { url: string }) => {
        dispatch(findImage(url));
        setUploadingImage(false);
      });

      socket.on('uploadFailed', async ({ errorMessage }: { errorMessage: string }) => {
        setUploadingImage(false);
        dispatch(openToast({ text: errorMessage, type: 'error' }));
      });
    }
  }, [uploadingImage]);

  useEffect(() => {
    const url = `${appConfig.api.baseUrl}/jim/v1/api/users/${address}/files/public-profile`;
    dispatch(findImage(url));
  }, []);

  const handleSelectFile = async ([file]: [TFile]) => {
    if (file) {
      setUploadingImage(true);
      dispatch(openToast({ text: 'Uploading image, please wait', type: 'info' }));
      useUploadImage({ file, address, fileCategory: 'public-profile' });
    }
  };

  const onFilesError = (error: Error) => {
    dispatch(
      openToast({
        text: `
        ${error.message}${error.message.includes(' is too large') ? ', maximum size 1.6MB' : ''}
        `,
        type: 'error',
      })
    );
  };

  const copyToClipboard = (textCopy: string, text: string) => {
    navigator.clipboard.writeText(textCopy);
    dispatch(openToast({ text: `${text} copied to clipboard`, type: 'success' }));
  };

  return (
    <>
      <SpinnerContainer isLoading={uploadingImage}>
        <Files
          onChange={handleSelectFile}
          accepts={['image/*']}
          multiple
          maxFileSize={1600000}
          minFileSize={0}
          onError={onFilesError}
          clickable
        >
          <IconButton edge="start" size="medium" sx={{ p: 1.3 }}>
            <Avatar
              alt="Profile Picture"
              src={imageAccount || PlaceholderAvatar}
              className={styles.accountAvatar}
            />
            <AddAPhotoIcon className={styles.icon} />
          </IconButton>
        </Files>
      </SpinnerContainer>
      <Grid>
        <Grid sx={{ paddingLeft: '1.5rem' }}>
          <button
            type="button"
            onClick={() => copyToClipboard(alias, 'Alias')}
            className={styles.buttonID}
          >
            <Grid className={styles.buttonLayout}>
              <Grid className={styles.buttonLeftAlias}>
                <ContentCopyIcon className={styles.iconTwo} />
              </Grid>
              <Grid className={styles.alias}>Alias </Grid>
            </Grid>
            <Grid className={styles.buttonRightAlias}> &nbsp; {alias}</Grid>
          </button>
        </Grid>

        <Grid sx={{ paddingLeft: '1.5rem' }}>
          <button
            type="button"
            onClick={() => copyToClipboard(address, 'Account ID')}
            className={styles.buttonID}
          >
            <Grid className={styles.buttonLayout}>
              <Grid className={styles.buttonLeftID}>
                <ContentCopyIcon className={styles.iconTwo} />
              </Grid>
              <Grid className={styles.id}>Account ID </Grid>
            </Grid>
            <Grid className={styles.buttonRightID}> &nbsp; {address}</Grid>
          </button>
        </Grid>
      </Grid>
    </>
  );
};
export default ProfileAvatar;
