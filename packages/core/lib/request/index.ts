import axios, { AxiosRequestConfig } from 'axios';
import { commonErrorHandler } from './helper';

export * from './helper';

export interface IApiError extends IResponse<never> {
  httpStatus: number;
}

export interface IPagination<T> {
  begin: number;
  count: number;
  end: number;
  index: number;
  list: T[];
  pageCount: number;
  size: number;
}

export interface IResponse<K> {
  message: string;
  result: K;
  status: string;
  statusCode: number;
}

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(({ headers, ...rest }) => ({ ...rest, headers }));

instance.interceptors.response.use(
  ({ data }) => data,
  (error) => commonErrorHandler(error)
);

interface IRequestFunction {
  <T = never, E = unknown>(url: string, config?: AxiosRequestConfig): Promise<IResponse<T> & E>;
}

interface IPayloadRequestFunction {
  <T = never, E = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<IResponse<T> & E>;
}

class Request {
  static get: IRequestFunction = instance.get;
  static delete: IRequestFunction = instance.delete;
  static head: IRequestFunction = instance.head;
  static post: IPayloadRequestFunction = instance.post;
  static put: IPayloadRequestFunction = instance.put;
  static patch: IPayloadRequestFunction = instance.patch;
}

export default Request;
