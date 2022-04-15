import { PUBLIC_ROUTES } from './constant';

export const isPublicRoute = (path: string) => PUBLIC_ROUTES.includes(path);
