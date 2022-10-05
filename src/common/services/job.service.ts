import httpService from './http.service';

type GetJobStatusResponse = {
  status: 'complete' | 'active' | 'failed' | 'inactive';
};

const getJobStatus = async (jobId: number) => {
  const { data } = await httpService.get<GetJobStatusResponse>(`/v1/api/job/status?jobId=${jobId}`);
  return data;
};

export default getJobStatus;
