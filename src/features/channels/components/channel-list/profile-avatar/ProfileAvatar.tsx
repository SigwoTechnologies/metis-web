import PlaceholderAvatar from '@metis/assets/images/avatars/astronaut.png';
import connectSocket from '@metis/common/services/socket.service';
import { SpinnerContainer } from '@metis/common/components/ui/spinner-container/SpinnerContainer';
import { findImage } from '@metis/features/auth/store/auth.actions';
import { useUploadImageProfile } from '@metis/features/channels/hooks/useUploadImageProfile';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Avatar, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import Files from 'react-files';
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
    jupAccount: { address },
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

  const handleSelectFile = async ([file]: [TFile]) => {
    if (file) {
      setUploadingImage(true);
      dispatch(openToast({ text: 'Uploading image, please wait', type: 'info' }));
      useUploadImageProfile({ file, address });
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

  return (
    <SpinnerContainer isLoading={uploadingImage}>
      <Files
        onChange={handleSelectFile}
        accepts={['image/*']}
        multiple
        maxFileSize={1_600_000}
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
  );
};
export default ProfileAvatar;
