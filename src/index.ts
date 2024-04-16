import { Server } from 'http';

import app from '@app';
import config from '@config/config';
import logger from 'services/logger';

const { port, projectName } = config;

const server: Server = app.listen(port, (): void => {
  logger.info(
    `Aapplication '${projectName}' listens on http://localhost:${port}`,
  );
});

const exitHandler = (): void => {
  if (!app) {
    process.exit(1);
  } else {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  }
};

const unexpectedErrorHandler = (): void => {
  // TDOO: Implement error Handdler
};

process.on('exit', exitHandler);
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', (reason: Error) => {
  throw reason;
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
