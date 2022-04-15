import moment from 'moment';
import { createLogger, format, transports } from 'winston';
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports';

type Params = (string | object)[];

const { combine, timestamp, label, printf, colorize, json } = format;
const { APP_PATH, NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

const formatLog = printf(({ timestamp, label, level, message }) => {
  const time = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
  return `${time} [${label}] ${level}: ${message}`;
});

const parseMessage = (params: Params) => {
  return params.reduce((acc, param) => `${acc} ${param instanceof Object ? JSON.stringify(param) : param}`, '');
};

const configs = {
  json: {
    level: 'debug',
    filename: `logs/json/log.json`,
    handleExceptions: true,
    maxsize: 10485760, // 10mb
    maxFiles: 10,
    colorize: false,
    format: combine(timestamp(), label({ label: APP_PATH }), json())
  },
  text: {
    level: 'debug',
    filename: `logs/text/log.txt`,
    handleExceptions: true,
    maxsize: 10485760,
    maxFiles: 10,
    colorize: false,
    format: combine(timestamp(), label({ label: APP_PATH }), formatLog)
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    colorize: true,
    format: combine(colorize(), label({ label: APP_PATH }), timestamp(), formatLog)
  }
};

const transportsInstances = [
  !isDev && new transports.File(configs.json),
  !isDev && new transports.File(configs.text),
  new transports.Console(configs.console)
].filter(Boolean) as (ConsoleTransportInstance | FileTransportInstance)[];

const logger = createLogger({
  exitOnError: false,
  transports: transportsInstances
});

export default {
  debug: (...params: Params) => logger.debug(parseMessage(params)),
  info: (...params: Params) => logger.info(parseMessage(params)),
  warn: (...params: Params) => logger.warn(parseMessage(params)),
  error: (...params: Params) => logger.error(parseMessage(params))
};
