declare const i18n: import('i18next').i18n;

declare const BUILD_NUMBER: string;
declare const NODE_ENV: string;
declare const APP_PATH: string;
declare module '*.svg';
declare module '*.png';

declare type BooleanType = 'true' | 'false';

declare type PickByType<T, P> = Pick<T, { [K in keyof T]: T[K] extends P ? K : never }[keyof T]>;

declare type PropertyType<T, K extends keyof T> = Pick<T, K>[K];

declare type Styles = Record<string, React.CSSProperties>;
