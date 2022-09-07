import httpService from './http.service';

type GetJobStatusResponse = {
  status: 'complete' | 'active' | 'failed' | 'inactive';
};

// eslint-disable-next-line import/prefer-default-export
export const getJobStatus = async (jobId: number) => {
  const { data } = await httpService.get<GetJobStatusResponse>(`/v1/api/job/status?jobId=${jobId}`);
  return data;
};
