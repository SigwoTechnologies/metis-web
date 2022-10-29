import PlaceholderAvatar from '@metis/assets/images/avatars/astronaut.png';
import connectSocket from '@metis/common/services/socket.service';
import Spinner from '@metis/common/components/ui/spinner/Spinner';
import { findImage } from '@metis/features/auth/store/auth.actions';
import { useUploadImageProfile } from '@metis/features/channels/hooks/useUploadImageProfile';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Avatar, Box, IconButton } from '@mui/material';
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
        socket.off('uploadCreated');
      });
    }
  }, [uploadingImage]);

  const handleSelectFile = async ([file]: [TFile]) => {
    if (!file) {
      throw new Error('[sendFileMessage]: File not provided');
    }
    setUploadingImage(true);
    dispatch(openToast({ text: 'Uploading image, please wait', type: 'info' }));
    useUploadImageProfile({ file, address });
  };
  return (
    <Spinner isLoading={uploadingImage}>
      <IconButton
        aria-label="send message"
        edge="start"
        size="medium"
        sx={{ p: 1.5 }}
        className={styles.container}
      >
        <Files
          className="files-dropzone"
          onChange={handleSelectFile}
          accepts={['image/*']}
          multiple
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          <Avatar
            alt="Channel Avatar"
            src={imageAccount || PlaceholderAvatar}
            className={styles.accountAvatar}
          />
          <Box>
            <AddAPhotoIcon className={styles.icon} />
          </Box>
        </Files>
      </IconButton>
    </Spinner>
  );
};
export default ProfileAvatar;
