/* eslint-disable camelcase */
import appConfig from '@metis/common/configuration/app.config';
import constants from '@metis/common/configuration/constants';
import { AttachmentObj } from '@metis/features/channels/types/AttachmentObj';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import useStyles from './Attachment.styles';

type Props = {
  attachmentObj: AttachmentObj;
};

const Message = ({ attachmentObj }: Props) => {
  const classes = useStyles();
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  // const type = (mimetype: string) => {
  //   const MIME_TYPES: { [key: string]: string } = {
  //     'image/jpeg': 'JPEG',
  //     'image/jpg': 'JPEG',
  //     'image/bpm': 'BPM',
  //     'image/png': 'PNG',
  //   };
  //   return MIME_TYPES[mimetype as string] || 'FILE';
  // };

  const shortName = (name: string) => {
    if (name && name.length > 10) {
      return `${name.substring(0, 10)}...`;
    }
    if (name) {
      return name;
    }
    return 'Image uploaded';
  };

  const getImage = async (url: string) => {
    setLoading(true);
    const { access_token } = JSON.parse(JSON.parse(String(localStorage.getItem(constants.TOKEN))));
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${access_token}`,
    };
    const { data } = await axios.get(`${appConfig.api.baseUrl}${url}`, {
      headers,
      responseType: 'blob',
    });

    const objectUrl = URL.createObjectURL(data);
    setPreview(objectUrl);
    setLoading(false);
  };

  useEffect(() => {
    if (attachmentObj) {
      getImage(attachmentObj.url);
    }
  }, []);

  if (loading) {
    return (
      <Box className={classes.container}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <img src={`${preview}`} alt={shortName(attachmentObj.originalname)} className={classes.image} />
  );
};

export default memo(Message);
