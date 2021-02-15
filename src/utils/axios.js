import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://quadcopter-api.thesoban.pl/',
  withCredentials: true,
});
