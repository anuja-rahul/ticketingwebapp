import Axios from 'axios'
import { envVar } from './env'

const defaultHeaders = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export const createHttpClient = (additionalHeaders = {}) => {
  return Axios.create({
    baseURL: envVar.API_URL,
    headers: {
      ...defaultHeaders,
      ...additionalHeaders
    },
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    withXSRFToken: true,
  });
};

