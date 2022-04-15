import axios, { AxiosRequestConfig } from 'axios';
import { Logger } from '../../services';

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(({ headers, ...rest }) => ({ ...rest, headers }));

instance.interceptors.response.use(
  ({ data }) => data,
  (error) => Logger.error(error)
);

interface IRequestFunction {
  <T = never>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

interface IPayloadRequestFunction {
  <T = never>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
}

class Fetch {
  static get: IRequestFunction = instance.get;
  static delete: IRequestFunction = instance.delete;
  static head: IRequestFunction = instance.head;
  static post: IPayloadRequestFunction = instance.post;
  static put: IPayloadRequestFunction = instance.put;
  static patch: IPayloadRequestFunction = instance.patch;
}

export default Fetch;
