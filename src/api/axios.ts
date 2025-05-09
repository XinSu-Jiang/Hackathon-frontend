import axios from 'axios';

import { checkAndSetToken, handleTokenError } from '@/api/interceptors';

const AXIOS_BASE_URL =
  'https://hackathon-db.crsiugqea11k.ap-northeast-2.rds.amazonaws.com/api';

const NETWORK = {
  TIMEOUT: 1000,
} as const;

export const axiosInstance = axios.create({
  baseURL: AXIOS_BASE_URL,
  timeout: NETWORK.TIMEOUT,
  withCredentials: true,
  useAuth: true,
});

export const axiosAuthInstance = axios.create({
  baseURL: AXIOS_BASE_URL,
  timeout: NETWORK.TIMEOUT,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(checkAndSetToken);

axiosInstance.interceptors.response.use(
  (response) => response,
  handleTokenError,
);
