import httpService from '@metis/common/services/http.service';

export type TImageProfile = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any;
  address: string;
  fileCategory: string;
};

export const useUploadImage = async ({ file, address, fileCategory }: TImageProfile) => {
  const formData = new FormData();
  formData.append('file', file as never);
  formData.append('originalFileType', String(file?.type));
  formData.append('attachToJupiterAddress', String(address));
  formData.append('fileCategory', fileCategory);
  formData.append('name', 'file');
  httpService.post('/jim/v2/api/files', formData);
};
