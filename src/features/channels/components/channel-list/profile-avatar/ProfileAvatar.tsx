import PLaceholderAvatar from '@metis/assets/images/avatars/astronaut.png';
import appConfig from '@metis/common/configuration/app.config';
import httpService from '@metis/common/services/http.service';
import connectSocket from '@metis/common/services/socket.service';
import { getToken } from '@metis/common/services/token.service';
import { useAppDispatch, useAppSelector } from '@metis/store/hooks';
import { openToast } from '@metis/store/ui/ui.slice';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Avatar, Box, CircularProgress, IconButton } from '@mui/material';
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
  } = useAppSelector((s) => s.auth);
  const [selectedFile, setSelectedFile] = useState<TFile>();
  const [preview, setPreview] = useState('');
  // const [uploadingImage, setUploadingImage] = useState(false);

  const getImage = async (url: string) => {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    };
    const { data } = await httpService.get(url, {
      headers,
      responseType: 'blob',
    });

    const objectUrl = URL.createObjectURL(data);
    setPreview(objectUrl);
  };

  useEffect(() => {
    const socket = connectSocket({
      query: {
        room: `upload-${address}`, // address of the current user
        user: address, // address of the current user
      },
    }).socket('/upload');

    if (address)
      socket.on('uploadCreated', async ({ url }: { url: string }) => {
        await getImage(url);
        // setUploadingImage(false);
      });

    return () => {
      socket.off('uploadCreated');
    };
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      getImage(`${appConfig.api.baseUrl}/jim/v1/api/users/${address}/files/public-profile`);
      return undefined;
    }

    const objectUrl = URL.createObjectURL(selectedFile as unknown as Blob);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const sendProfileAvatar = async (file: TFile) => {
    if (!file) {
      throw new Error('[sendFileMessage]: File not provided');
    }

    const formData = new FormData();
    formData.append('file', file as never);
    formData.append('originalFileType', String(selectedFile?.type));
    formData.append('attachToJupiterAddress', String(address));
    formData.append('fileCategory', 'public-profile');
    formData.append('name', 'file');

    const headers = {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      Authorization: `Bearer ${getToken()}`,
    };
    // setUploadingImage(true);
    dispatch(openToast({ text: 'Uploading image, please wait', type: 'info' }));
    setSelectedFile(undefined);
    setPreview('');

    return httpService.post('/jim/v2/api/files', formData, { headers });
  };
  const handleSelectFile = async ([file]: [TFile]) => {
    setSelectedFile(file);
    await sendProfileAvatar(file);
  };
  if (!preview.length) {
    return <CircularProgress className={styles.spinner} />;
  }
  return (
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
          src={preview || PLaceholderAvatar}
          className={styles.accountAvatar}
        />
        <Box>
          <AddAPhotoIcon className={styles.icon} />
        </Box>
      </Files>
    </IconButton>
  );
};
export default ProfileAvatar;
