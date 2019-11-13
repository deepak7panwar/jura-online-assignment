import { createLogger, transports, format, Logger } from 'winston';
import { StreamOptions } from 'morgan';


const options = {
  console: {
    level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: format.combine(
      format.timestamp(),
      format.colorize(),
      format.splat(),
      format.simple(),
    ),
  },
};

export let logger: Logger = createLogger({
  transports: [
    new transports.Console(options.console),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.splat(),
        format.simple(),
      ),
    }),
  );
}

export let streams: StreamOptions = {
  write: (message: any): void => {
    logger.info(message);
  },
};

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}
