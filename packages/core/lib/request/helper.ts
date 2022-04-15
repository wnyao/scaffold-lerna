import axios, { AxiosError } from 'axios';
import { IApiError } from './index';

export const commonErrorHandler = (error: AxiosError): Promise<IApiError> => {
  if (error.response) {
    // Business Level Error
    if (typeof error.response.data === 'object') {
      const { status: httpStatus, data } = error.response;
      const { message = i18n.t('Unknown Error') } = data;
      return Promise.reject({ ...data, message, httpStatus });
    }

    // Network Level Error
    const apiShortPath = error.config.url || '';
    const statusCode = error.response.status;
    const statusText = error.response.statusText;
    const message = `${apiShortPath} ${statusCode} (${statusText})`;
    return Promise.reject({ status: statusCode, message, httpStatus: statusCode });
  }

  if (axios.isCancel(error)) {
    return Promise.reject(null);
  }

  return Promise.reject({
    status: 'unknown_failed',
    message: '系统错误',
    httpStatus: 12163
  });
};
