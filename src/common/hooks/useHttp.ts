import { useCallback } from 'react';
import { AxiosInstance } from 'axios';
import { useAppDispatch } from '@metis/store/hooks';
import httpService from '../services/http.service';

const useHttp = () => {
  const dispatch = useAppDispatch();

  const getHttpService = useCallback(() => httpService, []);

  const requestInterceptor = (httpInstance: AxiosInstance, token: string | undefined) =>
    httpInstance.interceptors.request.use(async (config) => ({
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    }));

  const responseInterceptor = useCallback(
    (httpInstance: AxiosInstance) =>
      httpInstance.interceptors.response.use(
        async (response) => response,
        (error) =>
          // TODO: Implement exception handling (taskId: 2pc270e)
          Promise.reject(error)
      ),
    [dispatch]
  );

  return { getHttpService, requestInterceptor, responseInterceptor };
};

export default useHttp;
