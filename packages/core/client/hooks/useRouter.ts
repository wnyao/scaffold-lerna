import { useNavigate, useParams } from 'react-router';
import qs from 'qs';

interface IQuery extends Record<string, unknown> {}

export const useRouter = () => {
  const navigator = useNavigate();
  const params = useParams();

  const navigate = <T = IQuery>(pathname: string, params?: T): void => {
    const query = qs.stringify(params, { addQueryPrefix: true, filter: filterEmpty });
    navigator(pathname + query);
  };

  const replace = <T = IQuery>(pathname: string, params?: T): void => {
    const query = qs.stringify(params, { addQueryPrefix: true, filter: filterEmpty });
    navigator(pathname + query, { replace: true });
  };

  const goBack = (): void => navigate('-1');

  const setQuery = <T = IQuery>(key: keyof T, value: T[keyof T]) => {
    replace(window.location.pathname, { ...params, [key]: value });
  };

  return { navigate, replace, goBack, params, setQuery };
};

export const filterEmpty = (_prefix: string, value: unknown) => {
  if (value === null || value === undefined || value === '') {
    return {};
  }

  return value;
};
