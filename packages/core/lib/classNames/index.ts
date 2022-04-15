const classNames = (params: Record<string, boolean>) => {
  return Object.entries(params).reduce((acc, [key, valid]) => (!!valid ? `${acc} ${key}` : `${acc}`), '');
};

export default classNames;
