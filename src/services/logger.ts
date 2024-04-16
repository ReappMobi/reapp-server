import config from '@config/config';
import winston from 'winston';

const errorStackFormat = winston.format((info) => {
  if (info instanceof Error) {
    return {
      ...info,
      stack: info.stack,
      message: info.message,
    };
  }
  return info;
});

const errorTemplate = ({
  timestamp,
  level,
  message,
  stack,
}: winston.Logform.TransformableInfo) => {
  let tmpl = `${timestamp}`;
  tmpl += ` ${level} ${message}`;
  if (stack) tmpl += ` \n ${stack}`;
  return tmpl;
};

const logger: winston.Logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    errorStackFormat(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    config.env === 'development'
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(errorTemplate),
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

logger.info(`Logger level is set to ${logger.level}`);

export default logger;
