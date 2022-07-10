import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import appConfig from '../configuration/app.config';

const config: AxiosRequestConfig = {
  baseURL: appConfig.api.baseUrl,
};

const httpService: AxiosInstance = axios.create(config);
export default httpService;
